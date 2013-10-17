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
    'agenda/thisweek' : 'thisWeek',
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
    var filter = function(){
      return this.where({ due_to_s: agenda });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
  },

  // Filter tasks by priority
  priority: function(agenda){
    var filter = function(){
      return this.where({ priority: parseInt(agenda) });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
  },

  // Filter tasks by tag
  tag: function(agenda){
    var that = this;
    var filter = function(){
      return this.filter( function(task){
        return task.has('tags') && _.findWhere( task.get('tags'), { name: agenda } );
      });
    }
    this.addAgenda(this.collections.tasks, filter, agenda);
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

  // This Week
  thisWeek: function(){
    this.addSidebar();

    var that = this;
    var agendas = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    $mainContent.empty();
    _.each(agendas, function(agenda){
      var filter = function(){
        return this.where({ due_to_s: agenda });
      }
      var section =  new Lime.Views.TasksAgenda({
        collection: that.collections.tasks,
        filter: filter,
        title: agenda
      });
      $mainContent.append(section.render().$el);
    });

  },

  /* Helper methods */

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

  addGroups: function(groups, filter){

  }

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
