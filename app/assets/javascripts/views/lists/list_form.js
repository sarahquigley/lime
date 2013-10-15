// Purpose: Renders form for creating new Lists
// Where? Sidebar (no Parent View)

Lime.Views.ListForm = Backbone.View.extend({

  options: function(){
    return {
      model: new Lime.Models.List()
    };
  },

  initialize: function(options){
  },

  events: {
    'submit #list-form': 'submit'
  },

  el: '#app-sidebar > #lists-form-container',

  template: JST['lists/form'],

  render: function(){
    this.$el.html(this.template({
      list: this.model
    }));
    return this;
  },

  // Submits new Lists and resets the model on submission
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    this.collection.create(this.model, {
      wait: true,
      success: function(model){
        console.log('List created.');
        // There must be a better way to do this (in model)
        model.set('tasks', new Lime.Collections.Tasks());
        that.model = new Lime.Models.List();
        event.target.reset();
        Backbone.history.navigate(model.url(), {trigger: true});
      },
      error: function(model, errors){
        console.log('Error');
      }
    });
  }

});