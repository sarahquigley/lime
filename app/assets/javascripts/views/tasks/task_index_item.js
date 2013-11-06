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
      "click .show input.toggle": "toggleAttribute",
      "click .show .task-notes" : "openNotesIndex",
      "click .task-title h3": "edit",
      //"click .ddm .ddbutton": "dropMenu",
      "click .ddm .edit": "edit",
      "click .ddm .toggle": "toggleAttribute",
      "click .ddm .do-it-today": "doItToday",
      "click .ddm .postpone": "postpone",
      "click .ddm .move": "openMoveTaskForm",
      "click .ddm .delete": "deleteModel",
      "submit .task-form": "update",
      "click .move-task-form .cancel": "cancelMove",
      "submit .move-task-form": "update"
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

