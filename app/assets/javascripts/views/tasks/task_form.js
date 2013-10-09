Lime.Views.TaskForm = Backbone.View.extend({

  initialize: function(list){
    this.list = list;
    this.collection = list.get('tasks');
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
    // I want a smarter method of changing the collection url for this...
    this.collection.url = '/lists/' + this.list.get('id') + '/tasks';
    this.collection.create(this.model, {
      success: function(){
        console.log('Task saved.');
        that.collection.url = '/tasks';
        event.target.reset();
      }
    });
  }

});