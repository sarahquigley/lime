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
    'today': 'today'
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

  today: function(){
    this.addSidebar();
    taskCollection = this.tasksCollection;
    var tasksTodayView = new Lime.Views.TasksToday({
      collection: this.tasksCollection.today()
    });
    this.$contentEl.html(tasksTodayView.render().$el);
  },

  addSidebar: function(){
    var appSidebarView = new Lime.Views.AppSidebar({ collection: this.listsCollection });
    this.$sidebarEl.html(appSidebarView.render().$el);
  }

});
