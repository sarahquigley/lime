Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){
    this.collection = this.model.get('tasks');
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.collection, event, that.render);
    });
    that.listenTo(that.collection, 'sort', that.render);
  },

  events: {
    "click .sort-menu .app-drop-button": "dropMenu",
    "click .sort-menu button.sort-tasks": "sort"
  },

  el: '<section id="app-content">',

  template: JST['lists/show'],

  menuTemplate: JST['lists/show_menu'],

  render: function(){
    this.$el.html(this.template({
      list: this.model,
      showMenuTemplate: this.menuTemplate
    }));

    var tasksIndexView = new Lime.Views.TasksIndex({
      collection: this.collection
    });
    var taskFormView = new Lime.Views.TaskForm({ list: this.model });
    this.nestedViews = [tasksIndexView, taskFormView];
    this.$el.append(tasksIndexView.render().$el);
    this.$el.append(taskFormView.render().$el);
    return this;
  },

  // Drop Menu (needs click outside collapse)

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Sort
  sort: function(event){
    console.log('moo')
    sortAttribute = $(event.target).attr("data-sort");
    this.collection.sortCollection(sortAttribute);
  }

})