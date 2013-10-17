Lime.Routers.App = Backbone.Router.extend({

  initialize: function(collections, sidebarViews, mainContentViews){
    this.collections = collections;
    this.sidebarViews = sidebarViews;
    this.mainContentViews = mainContentViews;
    $mainContent = $('#app-content');
    this.mainView = null;
  },

  routes: {
    '': 'index',
    'agenda': 'index',
    'agenda/:agenda': 'agenda',
    'priority/:priority' : 'priority',
    'tags' : 'tags',
    'lists/:id' : 'listShow'
  },


  index: function(){
    this.agenda('Today');
  },

  agenda: function(agenda){
    this.addSidebar();
    var mainView = new Lime.Views.TasksAgenda({
      collection: this.collections.tasks.collectionWhere({ due_to_s: agenda }),
      title: agenda
    });
    $mainContent.html(mainView.render().$el);
    this.resetMainView(mainView);
    mainView.render();
  },

  priority: function(agenda){
    this.addSidebar();
    var mainView = new Lime.Views.TasksAgenda({
      collection: this.collections.tasks.collectionWhere({ priority: parseInt(agenda) }),
      title: 'Priority ' + agenda
    });
    this.resetMainView(mainView);
    $mainContent.html(mainView.render().$el);
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  listShow: function(id){
    this.addSidebar();
    var model = this.collections.lists.get(id);
    var mainView = new Lime.Views.ListShow({
      model: model
    });
    this.resetMainView(mainView);
    $mainContent.html(mainView.render().$el);
  },

  addSidebar: function(){
    this.sidebarViews.agendaNav.render();
    this.sidebarViews.listsIndex.render();
    this.sidebarViews.listForm.render();
  },

  resetMainView: function(view){
    if(this.mainView){
      this.mainView.close();
    }
    this.mainView = view
  }

});
