window.Lime = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(listsData, tasksData) {
    var listsCollection = new Lime.Collections.Lists(listsData);
    var tasksCollection = new Lime.Collections.Tasks(tasksData);

    new Lime.Routers.App('#app-sidebar-container', '#app-content-container', listsCollection, tasksCollection);
    Backbone.history.start();

    console.log('Welcome to Lime.');
  }
};