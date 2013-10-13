window.Lime = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(listsData, tasksData, tagsData) {
    console.log(tasksData);
    console.log(tagsData);
    var listsCollection = new Lime.Collections.Lists(listsData);
    var tasksCollection = new Lime.Collections.Tasks(tasksData);
    var tagsCollection = new Lime.Collections.Tags(tagsData);

    new Lime.Routers.App('#app-sidebar-container', '#app-content-container', listsCollection, tasksCollection, tagsCollection);
    Backbone.history.start();

    console.log('Welcome to Lime.');
  }
};
