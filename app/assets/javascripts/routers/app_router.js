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
    'tags/:tag' : 'tag',
    'lists/:id' : 'listShow'
  },


  index: function(){
    this.agenda('today');
  },

  agenda: function(agenda){
    var collection = this.collections.tasks.collectionWhere({ due_to_s: agenda });
    var title = agenda;
    this.addAgenda(collection, title);
  },

  priority: function(agenda){
    var collection = this.collections.tasks.collectionWhere({ priority: parseInt(agenda) });
    var title = 'Priority ' + agenda;
    this.addAgenda(collection, title);
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  tag: function(agenda){
    var that = this;
    var collection = that.collections.tasks.filter( function(task){
      return task.has('tags') && _.findWhere( task.get('tags'), { name: agenda } );
    });
    collection = new Lime.Collections.Tasks(collection);
    var title = agenda;
    this.addAgenda(collection, title);
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

  addAgenda: function(collection, title){
    this.addSidebar();
    var mainView = new Lime.Views.TasksAgenda({
      collection: collection,
      title: title
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
