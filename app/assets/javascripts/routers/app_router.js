Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, listsCollection, tasksCollection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.listsCollection = listsCollection;
    this.tasksCollection = tasksCollection;
  },

  routes: {
    '': 'index',
    'lists/:id' : 'featuredList',
    'agenda/:agenda': 'agenda',
  },

  index: function(){
    this.addSidebar();
    this.$contentEl.html();
  },

  featuredList: function(id){
    this.addSidebar();
    var appFeaturedListView = new Lime.Views.AppFeaturedList({
      collection: this.listsCollection,
      featuredListId: id
    });
    this.$contentEl.html(appFeaturedListView.render().$el);
  },

  agenda: function(agenda){
    this.addSidebar();
    var tasksAgendaView = new Lime.Views.TasksAgenda({
      collection: this.tasksCollection.collectionWhere({due_to_s: agenda}),
      agenda: agenda
    });
    this.$contentEl.html(tasksAgendaView.render().$el);
  },

  addSidebar: function(){
    var appSidebarView = new Lime.Views.AppSidebar({ collection: this.listsCollection });
    this.$sidebarEl.html(appSidebarView.render().$el);
  }

});
