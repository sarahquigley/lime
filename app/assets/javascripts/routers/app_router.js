Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, collection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.collection = collection;
  },

  routes: {
    '': 'index',
    'lists/:id' : 'featuredList'
  },

  index: function(){
    this.addSidebar();
    this.$contentEl.html();
  },

  featuredList: function(id){
    this.addSidebar();
    var appFeaturedListView = new Lime.Views.AppFeaturedList({
      collection: this.collection,
      featuredListId: id
    });
    this.$contentEl.html(appFeaturedListView.render().$el);
  },

  addSidebar: function(){
    var appSidebarView = new Lime.Views.AppSidebar({ collection: this.collection });
    this.$sidebarEl.html(appSidebarView.render().$el);
  }

});
