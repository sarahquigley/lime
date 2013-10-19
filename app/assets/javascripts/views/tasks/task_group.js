Lime.Views.TaskGroup = Backbone.View.extend({

  initialize: function(){
    var that = this;
    this.nestedViews = [];

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.collection, event, that.render);
    });
    //that.listenTo(that.collection, 'sort', that.render);

    var group = function(collection){
      return collection;
    }
    this.title = this.options.title ? this.options.title : "";
    this.display = this.options.display ? this.options.display : true;
    this.group = this.options.group ? this.options.group : group;
  },

  events: {

  },

  el: '<section class="group">',

  templates: {
    inbox : JST['app/inbox'],
    ntd: JST['app/nothing_to_do']
  },

  render: function(){
    var that = this;

    var renderedInbox = that.templates.inbox({
      inbox: inbox
    });
    $inbox.append(renderedInbox);
    var collection = that.collection.filtered();
    var group = inbox.group(collection);
    $inbox.append(that.renderCollection(group));
    $inboxes.append($inbox);

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


})