// Extend Backbone view prototype

_.extend(Backbone.View.prototype, {

  close: function(){
    this.remove();
    this.unbind();

    if(this.nestedViews){
      _.each(this.nestedViews, function(view){
        if (view.close){
          view.close();
        }
      })
    }
  }

});

// Extend Backbone collection protype

_.extend(Backbone.Collection.prototype, {

  comparator: function(model1, model2){
    model1 = model1.get(this.sortAttribute);
    model2 = model2.get(this.sortAttribute);
    return model1 > model2 ?  1 : model1 < model2 ? -1 : 0;
  },

  sortCollection: function(attribute){
    this.sortAttribute = attribute;
    this.sort();
  }

});

// Extend Backbone model prototype

_.extend(Backbone.Model.prototype, {



});