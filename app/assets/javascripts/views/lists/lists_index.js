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
    _.each(this.nestedViews, function(view){ view.close() });

    this.nestedViews = [];
    var $ul = $('<ul id="lists" class="app-sidebar-section">');

    this.collection.each(function(model){
      var listIndexItemView = new Lime.Views.ListIndexItem({
        model: model
      });
      that.nestedViews.push(listIndexItemView);
      $ul.append(listIndexItemView.render().$el);
    });

    this.$el.empty();
    this.$el.append($ul);

    return this;
  }

});
