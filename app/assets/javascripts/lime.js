window.Lime = {

  Models: {},
  Collections: {},
  Mixins: {},
  Views: {},
  Routers: {},
  Live: {
    Views: {},
    Collections: {}
  },

  initialize: function(listsData, tasksData, notesData, tagsData) {

    // Create site-wide collections
    var collections = this.Live.Collections = {
      lists: new Lime.Collections.Lists(listsData),
      tasks: new Lime.Collections.Tasks(tasksData),
      tasks: new Lime.Collections.Notes(notesData),
      tags: new Lime.Collections.Tags(tagsData)
    }

    // Create top level views
    // Sidebar
    var sidebarViews = this.Live.Views.Sidebar = {
      agendaNav: new Lime.Views.AgendaNav(),
      listsIndex: new Lime.Views.ListsIndex({ collection: collections.lists }),
      listForm: new Lime.Views.ListForm({ collection: collections.lists, model: new Lime.Models.List() })
    }

    // Main Content
    var mainContentViews = this.Live.Views.MainContent = {
      tagsIndex: new Lime.Views.TagsIndex({ collection: collections.tags, model: new Lime.Models.Tag() }),
    }

    new Lime.Routers.App(collections, sidebarViews, mainContentViews);

    Backbone.history.start();
    console.log('Welcome to Lime.');

  }

};
