Lime.Views.TaskGroup = Backbone.View.extend({

  initialize: function(){
    var that = this;
    this.nestedViews = [];

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.collection, event, that.render);
    });
    that.listenTo(that.collection, 'sort', that.render);
    
    this.group = this.options.group;
    this.collection.group = this.group.group;
  },

  events: {
  },

  el: '<section class="group">',

  templates: {
    group : JST['app/group'],
    form: JST['tasks/form'],
    ntd: JST['app/nothing_to_do']
  },

  render: function(){
    this.resetNestedViews();
    
    this.$el.empty();
    this.$el.html(this.templates.group({
      group: this.group
    }));
    this.$el.append(this.renderCollection());

    return this;
  },

  // Helper method, called by render
  renderCollection: function(){
    var that = this;

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tasks">');

    // Add <li> items for every model in the collection
    if(this.collection.group().length == 0){
      return this.templates.ntd({});
    } else {
      _.each(this.collection.group(), function(model){
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
  }

})
