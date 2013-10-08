Lime.Views.TaskForm = Backbone.View.extend({

  initialize: function(list){
    this.list = list;
    this.collection = list.get('tasks');
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
        console.log(that.list);
      }
    });
  }

});