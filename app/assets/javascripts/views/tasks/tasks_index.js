Lime.Views.TasksIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .task > input[type=checkbox]" : "toggleCompleted"
  },

  template: JST['tasks/index'],

  render: function(){
    this.$el.html(this.template({
      tasks: this.collection
    }));
    return this;
  },

  toggleCompleted: function(event){
    var that = this;
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.toggleCompleted();
  },

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.task').attr('data-task-id');
    return this.collection.get(eventModelId);
  }

});