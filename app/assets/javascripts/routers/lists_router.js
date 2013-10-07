Lime.Routers.Lists = Backbone.Router.extend({

  initialize: function(rootEl, collection){
    this.$rootEl = $(rootEl);
    this.collection = collection;
    this.model = this.collection.model;
  },

  routes: {
    '': 'index',
    'lists/:id' : 'show'
  },

  index: function(){
    var listsIndexView = new Lime.Views.ListsIndex({ collection: this.collection });
    this.$rootEl.html(listsIndexView.render().$el);
  },

  show: function(){

  }

});
