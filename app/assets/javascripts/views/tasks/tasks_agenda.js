Lime.Views.TasksAgenda = Backbone.View.extend({

  initialize: function(options){
    var that = this;
    this.nestedViews = [];
    this.collection.filtered = this.options.filter;
    this.title = this.options.title;

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
    });
  },

  el: '<div></div>',

  template: JST['agenda/show'],

  render: function(){   // Refactor into methods
    this.resetNestedViews();
    // Insert template & rendered collection
    this.$el.empty();
    this.$el.append(this.template({
      title: this.title
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
    _.each(this.collection.filtered(), function(model){
      var taskIndexItemView = new Lime.Views.TaskIndexItem({
        model: model
      });
      that.nestedViews.push(taskIndexItemView);
      $ul.append(taskIndexItemView.render().$el);
    });

    return $ul;
  }

})