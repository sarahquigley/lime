Lime.Mixins.Creatable = {

  create: function(event, options){
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    if(typeof options.beforeCreate === 'function'){
      options.beforeCreate();
    }

    this.collection.create(this.model, {
      wait: true,
      success: function(model, response){
        console.log(model.modelName + ' created.');
        if(typeof options.success === 'function'){
          options.success(model, response);
        }
      },
      error: function(model, errors, response){
        console.log('Error');
        if(typeof options.error === 'function'){
          options.error(model, errors, response);
        }
      }
    });
  }

};


Lime.Mixins.Updatable = {

  // Toggle individual attributes of the model
  toggleAttribute: function(event){
    var that = this;
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.model.toggleAttribute(attribute);
  },

  // Toggles between showing an model / displaying a form for editing that model
  toggleEdit: function(){
    this.$el.children('.show').toggleClass('hidden');
    this.$el.children('.edit').toggleClass('hidden');
  },

  // Display the model edit form on click of edit button
  edit: function(event){
    event.preventDefault();
    this.toggleEdit();
  },

  // Update the model on form submission
  update: function(event, callback){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    this.model.save({}, {
      success: function(model, response){
        console.log(model.modelName + ' updated');
        if(typeof callback === 'function'){ callback(model, response); }
      }
    });
  }

};


Lime.Mixins.Deletable = {

  // Delete the model
  delete: function(event, callback){
    event.preventDefault();
    this.model.destroy({
      success: function(model, response){
        console.log(model.modelName + ' deleted.');
        if(typeof callback === 'function'){ callback(model, response); }
      }
    })
  }

};

