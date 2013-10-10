Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, listsCollection, tasksCollection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.listsCollection = listsCollection;
    this.tasksCollection = tasksCollection;
  },

  routes: {
    '': 'index',
    'agenda': 'index',
    'agenda/:agenda': 'agenda',
    'lists/:id' : 'featuredList'
  },

  index: function(){
    this.agenda('Today')
  },

  agenda: function(agenda){
    this.addSidebar();
    var tasksAgendaView = new Lime.Views.TasksAgenda({
      collection: this.tasksCollection,
      agenda: agenda
    });
    this.$contentEl.html(tasksAgendaView.render().$el);
  },

  featuredList: function(id){
    this.addSidebar();
    var appFeaturedListView = new Lime.Views.AppFeaturedList({
      collection: this.listsCollection,
      featuredListId: id
    });
    this.$contentEl.html(appFeaturedListView.render().$el);
  },

  addSidebar: function(){
    var appSidebarView = new Lime.Views.AppSidebar({ collection: this.listsCollection });
    this.$sidebarEl.html(appSidebarView.render().$el);
  }

});
