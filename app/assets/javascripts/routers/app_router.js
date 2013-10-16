Lime.Routers.App = Backbone.Router.extend({

  initialize: function(collections, sidebarViews, mainContentViews){
    this.collections = collections;
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
    this.mainContentViews.taskAgenda.options.agenda = filter;
    this.mainContentViews.taskAgenda.options.title = agenda;
    this.mainContentViews.taskAgenda.render();
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  listShow: function(id){
    this.addSidebar();
    var currentView = _.find(this.mainContentViews.listShow(), function(view){
      return view.model.get('id') == id;
    });
    currentView.render();
  },

  addSidebar: function(){
    this.sidebarViews.agendaNav.render();
    this.sidebarViews.listsIndex.render();
    this.sidebarViews.listForm.render();
  }

});
