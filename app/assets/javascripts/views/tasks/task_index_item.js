Lime.Views.TaskIndexItem = Backbone.View.extend(
  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.Deletable, Lime.Mixins.UI, {

    initialize: function(options){
      var that = this;
      this.parent = this.options.parent;

      var events = ['add', 'change', 'remove', 'sync'];
      _(events).each(function(event){
        that.listenTo(that.model, event, that.render);
      });
    },

    events: {
      "click .task-show input.toggle": "toggleAttribute",
      "click .task-menu .app-drop-button": "dropMenu",
      "click .task-menu button.edit-task": "edit",
      "click .task-title h3": "edit",
      "submit .task-form": "update",
      "click .task-menu button.toggle": "toggleAttribute",
      "click .task-menu button.do-it-today-task": "doItToday",
      "click .task-menu button.postpone-task": "postpone",
      "click .task-menu button.move-task": "openMoveTaskForm",
      "submit .move-task-form": "update",
      "click .move-task-form .cancel": "cancelMove",
      "click .task-menu button.delete-task": "deleteModel",
      "click .task-show .task-notes" : "openNotesIndex"
    },

    el: '<li class="task clearfix">',

    templates:{
      index_item: JST['tasks/index_item'],
      menu: JST['tasks/menu'],
      form: JST['tasks/form'],
      move: JST['tasks/move']
    },

    render: function(){
      console.log('render');
      this.$el.html(this.templates.index_item({
        task: this.model,
        menuTemplate: this.templates.menu,
        formTemplate: this.templates.form,
        tags: Lime.Live.Collections.tags
      }));
      return this;
    },

    /* These functions change the event model, and save those changes to the DB */

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

    openMoveTaskForm: function(event){
      var moveTaskFormView = new Lime.Views.MoveTaskForm({
        model: this.model,
        parent: this.parent
      });
      
      $('body').append(moveTaskFormView.render().$el);
    },

    openNotesIndex: function(event){
      var notesIndexView = new Lime.Views.NotesIndex({
        model: this.model,
        collection: Lime.Live.Collections.notes
      });
      
      $('body').append(notesIndexView.render().$el);
    },

    // Delete the model
    deleteModel: function(event){
      var that = this;
      this.delete(event, function(){
        that.parent.trigger('change');
      });
    }

}));

