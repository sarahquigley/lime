Lime.Views.TaskIndexItem = Backbone.View.extend({

  initialize: function(options){
    var that = this;
    this.parent = this.options.parent;
    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
    });

  },

  events: {
    "click .task-show input.toggle": "toggle",
    "click .task-menu .app-drop-button": "dropMenu",
    "click .task-menu button.edit-task": "edit",
    "click .task-title h3": "edit",
    "submit .task-form": "update",
    "click .task-menu button.toggle": "toggle",
    "click .task-menu button.do-it-today-task": "doItToday",
    "click .task-menu button.postpone-task": "postpone",
    "click .task-menu button.delete-task": "delete"
  },

  el: '<li class="task clearfix">',

  templates:{
    index_item: JST['tasks/index_item'],
    menu: JST['tasks/menu'],
    form: JST['tasks/form']
  },

  render: function(){
    this.$el.html(this.templates.index_item({
      task: this.model,
      menuTemplate: this.templates.menu,
      formTemplate: this.templates.form,
      tags: Lime.Live.Collections.tags
    }));
    return this;
  },

  /* These functions alter the way the view is displayed */

  // Drops down then task item menus

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Toggles between displaying the task item / displaying a form for editing the task item
  switchView: function(){
    this.$el.children('.task-show').toggleClass('hidden');
    this.$el.children('.task-edit').toggleClass('hidden');
  },

  // Switches to display the edit form for the task item when edit button (in menu) is clicked
  edit: function(event){
    event.preventDefault();
    this.switchView();
  },

  /* These functions change the event model, and save those changes to the DB */

  // Update the model on form submission
  update: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    var that = this;
    this.model.save({}, {
      success: function(model, response){
        console.log('Task updated');
      }
    });
  },

  // Toggle individual attributes of the model
  toggle: function(event){
    var that = this;
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.model.toggleAttribute(attribute);
  },

  // Set due date for tomorrow
  doItToday: function(event){
    event.preventDefault();
    this.model.doItToday();
  },

  // Postpone task by one day
  postpone: function(event){
    event.preventDefault();
    this.model.postpone();
  },

  // Delete the model
  delete: function(event){
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function(){
        console.log('Task deleted.');
        that.parent.trigger('change');
      }
    })
  }

});
