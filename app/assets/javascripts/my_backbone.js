// Extend Backbone view prototype

_.extend(Backbone.View.prototype, {

  close: function(){
    this.remove(); // Remove view from DOM

    if(this.nestedViews){
      _.each(this.nestedViews, function(view){
        if (view.close){
          view.close();
        }
      })
    }
  },

  resetNestedViews: function(){
    _.each(this.nestedViews, function(view){ view.close() });
    this.nestedViews = [];
  }

});

// Extend Backbone collection protype

_.extend(Backbone.Collection.prototype, {

  collectionWhere: function(options){
    var newCollection = this.clone();
    return newCollection.set(this.where(options));
  }

});

// Extend Backbone model prototype

_.extend(Backbone.Model.prototype, {

  toggleAttribute: function(attribute){
    var options = {};
    options[attribute] = !this.get(attribute);
    options[this.modelName] = {};
    options[this.modelName][attribute] = !this.get(attribute);
    this.save(options, {
      success: function(model, response){
        console.log('Toggled ' + attribute + '.');
      }
    });
  },

});

function nestCollection(model, attributeName, nestedCollection) {
    //setup nested references
    for (var i = 0; i < nestedCollection.length; i++) {
      model.attributes[attributeName][i] = nestedCollection.at(i).attributes;
    }
    //create empty arrays if none

    nestedCollection.bind('add', function (initiative) {
      if (!model.get(attributeName)) {
        model.attributes[attributeName] = [];
      }
      model.get(attributeName).push(initiative.attributes);
    });

    nestedCollection.bind('remove', function (initiative) {
      var updateObj = {};
      updateObj[attributeName] = _.without(model.get(attributeName), initiative.attributes);
      model.set(updateObj);
    });
    return nestedCollection;
  }