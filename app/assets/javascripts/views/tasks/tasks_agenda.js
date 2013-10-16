Lime.Views.TasksAgenda = Backbone.View.extend({

  options: function(){
    return {
      agenda: "Today"
    };
  },

  initialize: function(options){
    this.tags = this.options.tags;
    this.nestedViews = [];
  },

  el: '#app-content',

  template: JST['agenda/show'],

  render: function(){   // Refactor into methods
    this.resetNestedViews();
    var filteredCollection = this.collection.collectionWhere({due_to_s: this.options.agenda});
    // Insert template & rendered collection
    this.$el.empty();
    this.$el.append(this.template({
      agenda: this.options.agenda
    }));

    this.$el.append(this.renderCollection(filteredCollection));

    return this;
  },

  // Helper method, called by render
  renderCollection: function(filteredCollection){
    var that = this;

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tasks">');

    // Add <li> items for every model in the collection
    filteredCollection.each(function(model){
      var taskIndexItemView = new Lime.Views.TaskIndexItem({
        model: model,
        tags: that.tags
      });
      that.nestedViews.push(taskIndexItemView);
      $ul.append(taskIndexItemView.render().$el);
    });

    return $ul;
  },

})