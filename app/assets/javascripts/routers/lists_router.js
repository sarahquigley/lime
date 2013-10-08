Lime.Routers.Lists = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, collection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.collection = collection;
  },

  routes: {
    '': 'index',
    'lists/:id' : 'show'
  },

  index: function(){
    var listsIndexView = new Lime.Views.ListsIndex({ collection: this.collection });
    this.$sidebarEl.html(listsIndexView.render().$el);
  },

  show: function(id){
    this.index();
    var listShowView = new Lime.Views.ListShow({ model: this.collection.get(id) });
    this.$contentEl.html(listShowView.render().$el);
  }

});
