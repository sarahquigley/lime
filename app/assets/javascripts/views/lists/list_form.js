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

  el: '<div id="lists-form-container" class="sidebar-section">',

  template: JST['lists/form'],

  render: function(){
    this.$el.html(this.template({
      list: this.model
    }));
    return this;
  },

  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    if(this.model.isNew()){
      this.collection.create(this.model, {
        wait: true,
        success: function(model){
          console.log('List created.');
          // There must be a better way to do this (in model)
          model.set('tasks', new Lime.Collections.Tasks());
          Backbone.history.navigate(model.url(), {trigger: true})
        },
        error: function(model, errors){
          console.log('Error');
        }
      });
    } else {
      this.model.save({}, {
        success: function(){
          console.log('List updated');
        }
      });
    }

  }

});