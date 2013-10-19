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
    inbox: JST['app/inbox'],
    showMenu: JST['lists/show_menu'],
    form: JST['tasks/form'],
    ntd: JST['app/nothing_to_do']
  },

  inbox: {

    main: {
      title: null,
      display: true,
      group: function(collection){
        return _.filter(collection, function(task){
          return !task.get('completed') && !task.get('archived');
        });
      }
    },

    completed: {
      title: "completed",
      display: true,
      group: function(collection){
        return _.filter(collection, function(task){
          return task.get('completed') && !task.get('archived');
        });
      }
    },

    archived: {
      title: "archived",
      display: false,
      group: function(collection){
        return _.filter(collection, function(task){
          return task.get('archived');
        });
      }
    },
  },

  render: function(){   // Refactor into methods
    this.resetNestedViews();

    // Insert template & rendered collection
    this.$el.empty();
    this.$el.html(this.templates.show({
      list: this.model,
      showMenuTemplate: this.templates.showMenu
    }));

    this.$el.append(this.renderInbox());
    this.$el.append(this.templates.form({
      task: this.newTask,
      tags: Lime.Live.Collections.tags
    }))

    return this;
  },

  renderInbox: function(){
    var that = this;
    var $inboxes = $('<div id="inboxes">');

    _.each(this.inbox, function(inbox){
      var $inbox = $('<section class="inbox">');
      var renderedInbox = that.templates.inbox({
        inbox: inbox
      });
      $inbox.append(renderedInbox);
      var collection = that.collection.filtered();
      var group = inbox.group(collection);
      $inbox.append(that.renderCollection(group));
      $inboxes.append($inbox);
    });
    return $inboxes;
  },

  // Helper method, called by render
  renderCollection: function(collection){
    var that = this;
    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tasks">');

    // Add <li> items for every model in the collection
    if(collection.length == 0){
      return this.templates.ntd({});
    } else {
      _.each(collection, function(model){
        var taskIndexItemView = new Lime.Views.TaskIndexItem({
          model: model,
          parent: that.model,
          tags: Lime.Live.Collections.tags
        });
        that.nestedViews.push(taskIndexItemView);
        $ul.append(taskIndexItemView.render().$el);
      });
      return $ul;
    }
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