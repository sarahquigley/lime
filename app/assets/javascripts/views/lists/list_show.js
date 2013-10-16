Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){
    var that = this;

    this.collection = this.model.get('tasks');
    this.newTask = new Lime.Models.Task(),
    this.nestedViews = [];

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.collection, event, that.render);
    });
    this.listenTo(that.collection, 'sort', that.render);
  },

  events: {
    "click .sort-menu .app-drop-button": "dropMenu",
    "click .sort-menu button.sort-tasks": "sort",
    "submit .task-form": "submit",
  },

  el: '#app-content',

  templates: {
    show: JST['lists/show'],
    showMenu: JST['lists/show_menu'],
    form: JST['tasks/form']
  },

  render: function(){   // Refactor into methods
    this.resetNestedViews();

    // Insert template & rendered collection
    this.$el.empty();
    this.$el.html(this.templates.show({
      list: this.model,
      showMenuTemplate: this.templates.showMenu
    }));

    this.$el.append(this.renderCollection());
    this.$el.append(this.templates.form({
      task: this.newTask,
      tags: Lime.Live.Collections.tags
    }))

    return this;
  },

  // Helper method, called by render
  renderCollection: function(){
    var that = this;

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tasks">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      var taskIndexItemView = new Lime.Views.TaskIndexItem({
        model: model,
        tags: that.tags
      });
      that.nestedViews.push(taskIndexItemView);
      $ul.append(taskIndexItemView.render().$el);
    });

    return $ul;
  },

  // Drop Menu (needs click outside collapse)
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Sort
  sort: function(event){
    event.preventDefault();
    sortAttribute = $(event.target).attr("data-sort");
    this.collection.sortCollection(sortAttribute);
  },

  // Submit new task
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.newTask.set(attrs);

    this.collection.url = '/lists/' + this.model.get('id') + '/tasks';
    this.collection.create(this.newTask, {
      wait: true,
      success: function(model, response){
        console.log('Task created.');
        model.set('tags', new Lime.Collections.Tags(response.get('tags')));
        that.collection.url = '/tasks';
        that.newTask = new Lime.Models.Task();
      },
      errors: function(model, errors){
        console.log(errors);
      }
    });
  }

})