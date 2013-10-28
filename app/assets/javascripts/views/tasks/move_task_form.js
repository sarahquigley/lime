Lime.Views.TaskIndexItem = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.UI, {

  initialize: function(options){
  },

  events: {
    "submit .move-task-form": "update",
    "click .move-task-form .cancel": "cancelMove",
  },

  template: JST['tasks/move_task'],

  render: function(){
    this.$el.html(this.template({
      task: this.model,
      lists: Lime.Live.Collections.lists
    });
    return this;
  },

  cancelMove: function(event){
    event.preventDefault();
  }


}));
