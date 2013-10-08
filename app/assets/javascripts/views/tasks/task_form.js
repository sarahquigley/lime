Lime.Views.TaskForm = Backbone.View.extend({

  initialize: function(list){
    this.list = list;
    this.collection = list.get('tasks');
    // Not a fan of the necessity for this - there must be a way to set this in the collection
    this.collection.url = '/lists/' + list.get('id') + '/tasks';
    this.model = new Lime.Models.Task();
  },

  events: {
    "submit #task-form": "submit"
  },

  template: JST['tasks/form'],

  render: function(){
    this.$el.html(this.template({
    }));
    return this;
  },

  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);
    this.collection.create(this.model, {
      success: function(){
        console.log('Task saved.');
        event.target.reset();
      }
    });
  }

});