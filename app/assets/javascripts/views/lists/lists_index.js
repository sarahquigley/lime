// Purpose: Renders index of User's Lists
// Where? Sidebar (no Parent View)

Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render);
    });
  },

  el: '#app-sidebar > #lists-container',

  render: function(){
    this.resetNestedViews();

    // Insert rendered collection
    this.$el.empty();
    this.$el.append(this.renderedCollection());

    return this;
  },

  renderedCollection: function(){
    var that = this;

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="lists" class="app-sidebar-section">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      var listIndexItemView = new Lime.Views.ListIndexItem({
        model: model,
        collection: Lime.Live.Collections.tasks.collectionWhere({list_id: model.get('id')})
      });
      that.nestedViews.push(listIndexItemView);
      $ul.append(listIndexItemView.render().$el);
    });

    return $ul;
  }

});
