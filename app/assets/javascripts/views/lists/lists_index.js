// Purpose: Renders index of User's Lists
// Where? Sidebar (no Parent View)

Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  el: '#app-sidebar > #lists-container',

  render: function(){
    var that = this;

    // Close all previously nested views and reset this.nestedViews
    _.each(this.nestedViews, function(view){ view.close() });
    this.nestedViews = [];

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="lists" class="app-sidebar-section">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      var listIndexItemView = new Lime.Views.ListIndexItem({
        model: model
      });
      that.nestedViews.push(listIndexItemView);
      $ul.append(listIndexItemView.render().$el);
    });

    // Insert populated <ul>
    this.$el.empty();
    this.$el.append($ul);

    return this;
  }

});
