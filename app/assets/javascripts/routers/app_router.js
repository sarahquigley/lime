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
    var filter = function(){
      return this.where({ due_to_s: agenda });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
  },

  priority: function(agenda){
    var filter = function(){
      return this.where({ priority: parseInt(agenda) });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
  },

  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  tag: function(agenda){
    var that = this;
    var filter = function(){
      return this.filter( function(task){
        return task.has('tags') && _.findWhere( task.get('tags'), { name: agenda } );
      });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
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

  addAgenda: function(collection, filter, title){
    this.addSidebar();
    var mainView = new Lime.Views.TasksAgenda({
      collection: collection,
      filter: filter,
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
