Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, listsCollection, tasksCollection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.listsCollection = listsCollection;
    this.tasksCollection = tasksCollection;
    this.currentViews = [];
  },

  routes: {
    '': 'index',
    'agenda': 'index',
    'agenda/:agenda': 'agenda',
    'lists/:id' : 'featuredList'
  },

  index: function(){
    this.agenda('Today');
  },

  agenda: function(agenda){
    var appSidebarView = this.addSidebar();
    var tasksAgendaView = new Lime.Views.TasksAgenda({
      collection: this.tasksCollection,
      agenda: agenda
    });
    this.closeCurrentViews = ([appSidebarView, tasksAgendaView]);
    this.$contentEl.html(tasksAgendaView.render().$el);
  },

  featuredList: function(id){
    var appSidebarView = this.addSidebar();
    var appFeaturedListView = new Lime.Views.AppFeaturedList({
      collection: this.listsCollection,
      featuredListId: id
    });
    this.closeCurrentViews = ([appSidebarView, appFeaturedListView]);
    this.$contentEl.html(appFeaturedListView.render().$el);
  },

  addSidebar: function(){
    var appSidebarView = new Lime.Views.AppSidebar({ collection: this.listsCollection });
    this.$sidebarEl.html(appSidebarView.render().$el);
    return appSidebarView;
  },

  closeCurrentViews: function(newViews){
    if(this.currentViews.length > 0){
      _.each(this.currentViews, function(view){
        view.close();
      });
    }
    this.currentViews = newViews;
  }

});
