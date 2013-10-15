Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, listsCollection, tasksCollection, tagsCollection, sidebarViews){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.listsCollection = listsCollection;
    this.tasksCollection = tasksCollection;
    this.tagsCollection = tagsCollection;
    this.sidebarViews = sidebarViews;
    this.currentViews = [];
  },

  routes: {
    '': 'index',
    'agenda': 'index',
    'agenda/:agenda': 'agenda',
    'tags' : 'tags',
    'lists/:id' : 'listShow'
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
    //this.closeCurrentViews([appSidebarView, tasksAgendaView]);
    this.$contentEl.html(tasksAgendaView.render().$el);
  },

  tags: function(){
    var appSidebarView = this.addSidebar();
    var tagsIndexView = new Lime.Views.TagsIndex({
      collection: this.tagsCollection
    });
    //this.closeCurrentViews([appSidebarView, tagsIndexView]);
    this.$contentEl.html(tagsIndexView.render().$el);
  },

  listShow: function(id){
    var appSidebarView = this.addSidebar();
    var listShowView = new Lime.Views.ListShow({
      model: this.listsCollection.get(id),
      tags: this.tagsCollection
    });
    //this.closeCurrentViews([appSidebarView, listShowView]);
    this.$contentEl.html(listShowView.render().$el);
  },

  addSidebar: function(){
    this.sidebarViews.agendaNavView.render();
    this.sidebarViews.listsIndexView.render();
    this.sidebarViews.listFormView.render();
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
