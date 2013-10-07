window.Lime = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(listsData) {
    var listsCollection = new Lime.Collections.Lists(listsData);
    new Lime.Routers.Lists('#app-sidebar', listsCollection);
    Backbone.history.start();
    console.log('Welcome to Lime.');
  }
};