window.Lime = {

  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(listsData, tasksData, tagsData) {

    // Create site-wide collections
    var listsCollection = new Lime.Collections.Lists(listsData);
    var tasksCollection = new Lime.Collections.Tasks(tasksData);
    var tagsCollection = new Lime.Collections.Tags(tagsData);

    // Create site-wide views

    var sidebarViews = {
      agendaNavView: new Lime.Views.AgendaNav(),
      listsIndexView: new Lime.Views.ListsIndex({ collection: listsCollection }),
      listFormView: new Lime.Views.ListForm({ collection: listsCollection })
    }

    // Main Content:

    var mainContentViews = {

    }

    new Lime.Routers.App('#app-sidebar', '#app-content-container', listsCollection, tasksCollection, tagsCollection, sidebarViews);

    Backbone.history.start();
    console.log('Welcome to Lime.');

  }

};
