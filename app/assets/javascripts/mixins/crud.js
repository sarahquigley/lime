Lime.Mixins.Creatable = {

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
  update: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    var that = this;
    this.model.save({}, {
      success: function(model, response){
        console.log(model.modelName + ' updated');
      }
    });
  }

};


Lime.Mixins.Deletable = {

  // Delete the model
  delete: function(event){
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function(model, response){
        console.log(model.modelName + ' deleted.');
        that.parent.trigger('change');
      }
    })
  }

};

