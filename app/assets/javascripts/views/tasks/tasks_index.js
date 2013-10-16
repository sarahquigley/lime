Lime.Views.TasksIndex = Backbone.View.extend({

  initialize: function(){
    this.tags = this.options.tags;
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .task > input.toggle" : "toggle",
    "click .task-menu .app-drop-button": "dropMenu",
    "click .task-menu button.edit-task" : "edit",
    "click .task-title h3": "edit",
    "click .task-menu button.toggle" : "toggle",
    "click .task-menu button.do-it-today-task" : "doItToday",
    "click .task-menu button.postpone-task" : "postpone",
    "click .task-menu button.delete-task" : "delete"
  },

  el: '<div id="tasks-container">',

  templates: {
    index: JST['tasks/index'],
    menu: JST['tasks/menu']
  },

  render: function(){
    this.$el.html(this.template.index({
      tasks: this.collection,
      menuTemplate: this.templates.menu
    }));
    return this;
  },

  // Drop Menu (needs click outside collapse)

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Edit

  edit: function(){
    event.preventDefault();
    var taskFormView = new Lime.Views.TaskForm({
      model: this.eventModel(event),
      tags: this.tags
    });
    $(event.target).parents('.task').html(taskFormView.render().$el);
  },

  // Toggles

  toggle: function(event){
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.eventModel(event).toggleAttribute(attribute);
  },

  // Due date

  doItToday: function(event){
    event.preventDefault();
    this.eventModel(event).doItToday();
  },

  postpone: function(event){
    event.preventDefault();
    this.eventModel(event).postpone();
  },

  // Delete

  delete: function(event){
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.destroy({
      success: function(){
        console.log('Task deleted.')
      }
    })
  },

  // Helper

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.task').attr('data-task-id');
    return this.collection.get(eventModelId);
  }

});
