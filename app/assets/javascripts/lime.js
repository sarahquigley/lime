window.Lime = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(listsData) {
    var listsCollection = new Lime.Collections.Lists(listsData);
    new Lime.Routers.App('#app-sidebar-container', '#app-content-container', listsCollection);
    Backbone.history.start();
    console.log('Welcome to Lime.');
  }
};