Lime.Views.ListForm = Backbone.View.extend({

  initialize: function(){
    this.model = new Lime.Models.List();
  },

  events: {
    'submit #list-form': 'submit'
  },

  template: JST['lists/form'],

  render: function(){
    this.$el.html(this.template({
    }));
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);
    this.collection.create(this.model, {
      success: function(model){
        console.log('List saved.');
        // There must be a better way to do this (in model)
        model.set('tasks', new Lime.Collections.Lists());
        event.target.reset();
      }
    });
  }

});