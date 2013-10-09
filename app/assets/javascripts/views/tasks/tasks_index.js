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
    "click .task button.edit-task" : "edit",
    "click .task button.complete-task" : "toggleCompleted",
    "click .task button.archive-task" : "toggleArchived",
    "click .task button.do-it-today-task" : "doItToday",
    "click .task button.postpone-task" : "postpone",
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

  edit: function(){
    event.preventDefault();
    var taskFormView = new Lime.Views.TaskForm({model: this.eventModel(event)});
    $(event.target).parents('.task').html(taskFormView.render().$el);
  },

  toggleCompleted: function(event){
    event.preventDefault();
    this.eventModel(event).toggleCompleted();
  },

  toggleArchived: function(event){
    event.preventDefault();
    this.eventModel(event).toggleArchived();
  },

  doItToday: function(event){
    event.preventDefault();
    this.eventModel(event).doItToday();
  },

  postpone: function(event){
    event.preventDefault();
    this.eventModel(event).postpone();
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