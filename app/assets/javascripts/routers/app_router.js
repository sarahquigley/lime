Lime.Routers.App = Backbone.Router.extend({

  initialize: function(collections, sidebarViews, mainContentViews){
    this.collections = collections;
    this.sidebarViews = sidebarViews;
    this.mainContentViews = mainContentViews;
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
    mainView.render();
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  listShow: function(id){
    this.addSidebar();
    console.log(this.collections.lists.get(id));
    var mainView = new Lime.Views.ListShow({
      model: this.collections.lists.get(id)
    });
    this.resetMainView(mainView);
    mainView.render();
  },

  addSidebar: function(){
    this.sidebarViews.agendaNav.render();
    this.sidebarViews.listsIndex.render();
    this.sidebarViews.listForm.render();
  },

  resetMainView: function(view){
    if(this.mainView){
      this.mainView.close();
      this.mainView = view;
    }
  }

});
