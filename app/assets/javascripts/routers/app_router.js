Lime.Routers.App = Backbone.Router.extend({

  initialize: function(sidebarViews, mainContentViews){
    this.sidebarViews = sidebarViews;
    this.mainContentViews = mainContentViews;
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
    this.addSidebar();
    this.mainContentViews.taskAgendaView.options.agenda = agenda;
    this.mainContentViews.taskAgendaView.render();
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndexView.render();
  },

  listShow: function(id){
    this.addSidebar();
    // var listShowView = new Lime.Views.ListShow({
    //   model: this.listsCollection.get(id),
    //   tags: this.tagsCollection
    // });
    // //this.closeCurrentViews([appSidebarView, listShowView]);
    // this.$contentEl.html(listShowView.render().$el);
  },

  addSidebar: function(){
    this.sidebarViews.agendaNavView.render();
    this.sidebarViews.listsIndexView.render();
    this.sidebarViews.listFormView.render();
  }

});
