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
//    'agenda/thisweek' : 'thisWeek',
    'agenda/:agenda': 'agenda',
    'priority/:priority' : 'priority',
    'tags' : 'tags',
    'tags/:tag' : 'tag',
    'lists/:id' : 'listShow'
  },

  // Home route
  index: function(){
    this.agenda('today');
  },

  /* Agenda based views */

  // Filter task by due string
  agenda: function(agenda){
    var agenda = agenda.toLowerCase();
    var filter = function(){
      return this.filter(function(task){
        return task.dueStr() === agenda;
      });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
  },

  // Filter tasks by priority
  priority: function(agenda){
    var filter = function(){
      return this.where({ priority: parseInt(agenda) });
    }
    this.addAgenda(this.collections.tasks, filter, 'priority ' + agenda);
  },

  // Filter tasks by tag
  tag: function(agenda){
    var that = this;
    var filter = function(){
      return this.filter( function(task){
        return task.has('tags') && _.findWhere( task.get('tags'), { name: agenda } );
      });
    }
    this.addAgenda(this.collections.tasks, filter, '#' + agenda);
  },


  // Tags index
  tags: function(){
    this.addSidebar();
    this.mainContentViews.tagsIndex.render();
  },

  // Feature list + its tasks
  listShow: function(id){
    this.addSidebar();
    var filter = function(){
      return this.where({ list_id: parseInt(id) });
    }
    var mainView = new Lime.Views.ListShow({
      model: this.collections.lists.get(id),
      collection: this.collections.tasks,
      filter: filter
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
    this.mainView = view;
  }

});
