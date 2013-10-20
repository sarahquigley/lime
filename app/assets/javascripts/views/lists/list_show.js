Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){
    var that = this;
    this.newTask = new Lime.Models.Task();
    this.nestedViews = [];
    this.collection.filtered = this.options.filter;

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.collection, event, that.render);
    });
    that.listenTo(that.collection, 'sort', that.render);
  },

  events: {
    "click .sort-menu .app-drop-button": "dropMenu",
    "click .sort-menu button.sort-tasks": "sort",
    "submit .task-form": "submit",
  },

  el: '<div>',

  templates: {
    show: JST['lists/show'],
    showMenu: JST['lists/show_menu'],
    form: JST['tasks/form'],
  },

  render: function(){   // Refactor into methods
    var that = this;
    this.resetNestedViews();

    // Insert template & rendered collection
    this.$el.empty();
    this.$el.html(this.templates.show({
      list: this.model,
      showMenuTemplate: this.templates.showMenu
    }));
  
    _.each(this.collection.groups, function(group){
      var taskGroupView = new Lime.Views.TaskGroup({
        collection: that.collection,
        model: that.model,
        group: group
      });
      that.nestedViews.push(taskGroupView);
      that.$el.append(taskGroupView.render().$el);
    });

    this.$el.append(this.templates.form({
      task: this.newTask,
      tags: Lime.Live.Collections.tags
    }))

    return this;
  },

  // Drop Menu (needs click outside collapse)
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Sort
  sort: function(event){
    event.preventDefault();
    var sortAttribute = $(event.target).attr("data-sort");
    this.collection.comparator = sortAttribute;
    this.collection.sort();
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
        that.collection.url = '/tasks';
        that.model.trigger('change');
        that.newTask = new Lime.Models.Task();
      },
      errors: function(model, errors){
        console.log(errors);
      }
    });
  }

})
