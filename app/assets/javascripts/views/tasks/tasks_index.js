Lime.Views.TasksIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .task > input.toggle-task-completed" : "toggleCompleted",
    "click .task button.archive-task" : "toggleArchived",
    "click .task button.delete-task" : "delete"
  },

  template: JST['tasks/index'],
  menuTemplate: JST['tasks/menu'],

  render: function(){
    this.$el.html(this.template({
      tasks: this.collection,
      menuTemplate: this.menuTemplate
    }));
    return this;
  },

  toggleCompleted: function(event){
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.toggleCompleted();
  },

  toggleArchived: function(event){
    var that = this;
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.toggleArchived();
  },

  delete: function(event){
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.destroy({
      success: function(){
        console.log('Task deleted.')
      }
    })
  },

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.task').attr('data-task-id');
    return this.collection.get(eventModelId);
  }

});