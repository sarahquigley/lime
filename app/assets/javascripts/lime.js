window.Lime = {

  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Live: {
    Views: {},
    Collections: {}
  },

  initialize: function(listsData, tasksData, tagsData) {

    // Create site-wide collections
    var collections = this.Live.Collections = {
      lists: new Lime.Collections.Lists(listsData),
      tasks: new Lime.Collections.Tasks(tasksData),
      tags: new Lime.Collections.Tags(tagsData)
    }

    // Create top level views
    // Sidebar
    var sidebarViews = this.Live.Views.Sidebar = {
      agendaNav: new Lime.Views.AgendaNav(),
      listsIndex: new Lime.Views.ListsIndex({ collection: collections.lists }),
      listForm: new Lime.Views.ListForm({ collection: collections.lists })
    }

    // Main Content
    var mainContentViews = this.Live.Views.MainContent = {
      tagsIndex: new Lime.Views.TagsIndex({ collection: collections.tags, model: new Lime.Models.Tag() }),
      taskAgenda: new Lime.Views.TasksAgenda({ collection: collections.tasks }),
      listShow: function(){
        return collections.lists.map(function(list){
          return new Lime.Views.ListShow({ model: list })
        });
      }
    }

    new Lime.Routers.App(collections, sidebarViews, mainContentViews);

    Backbone.history.start();
    console.log('Welcome to Lime.');

  }

};
