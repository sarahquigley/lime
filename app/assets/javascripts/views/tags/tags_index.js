Lime.Views.TagsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  el: $('#app-content'),

  template: JST['tags/index'],

  render: function(){
    var that = this;

    // Close all previously nested views and reset this.nestedViews
    _.each(this.nestedViews, function(view){ view.close() });
    this.nestedViews = [];

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tags">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      var tagIndexItemView = new Lime.Views.TagIndexItem({
        model: model
      });
      that.nestedViews.push(tagIndexItemView);
      $ul.append(tagIndexItemView.render().$el);
    });

    // Insert populated <ul>
    this.$el.empty();
    this.$el.append(this.template({}));
    this.$el.append($ul);

    return this;
  }

})
