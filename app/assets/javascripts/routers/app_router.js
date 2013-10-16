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
    var filter = { due_to_s: agenda };
    this.mainContentViews.taskAgendaView.options.agenda = filter;
    this.mainContentViews.taskAgendaView.options.title = agenda;
    this.mainContentViews.taskAgendaView.render();
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndexView.render();
  },

  listShow: function(id){
    this.addSidebar();
    var filter = { list_id: parseInt(id) };
    this.mainContentViews.taskAgendaView.options.agenda = filter;
    this.mainContentViews.taskAgendaView.options.title = "Featured List";
    this.mainContentViews.taskAgendaView.render();
  },

  addSidebar: function(){
    this.sidebarViews.agendaNavView.render();
    this.sidebarViews.listsIndexView.render();
    this.sidebarViews.listFormView.render();
  }

});
