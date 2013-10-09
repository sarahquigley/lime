Lime.Routers.Lists = Backbone.Router.extend({

  initialize: function(sidebarEl, contentEl, collection){
    this.$sidebarEl = $(sidebarEl);
    this.$contentEl = $(contentEl);
    this.collection = collection;
  },

  routes: {
    '': 'index',
    'lists/:id' : 'show'
  },

  index: function(){
    var listsIndexView = new Lime.Views.ListsIndex({ collection: this.collection });
    var listFormView = new Lime.Views.ListForm({collection: this.collection});
    this.$sidebarEl.html(listsIndexView.render().$el);
    this.$sidebarEl.append(listFormView.render().$el);
    this.$contentEl.html('Loading content...');
  },

  show: function(id){
    this.index();
    var listShowView = new Lime.Views.ListShow({ model: this.collection.get(id) });
    var taskFormView = new Lime.Views.TaskForm({ list: this.collection.get(id) });
    this.$contentEl.html(listShowView.render().$el);
    this.$contentEl.append(taskFormView.render().$el);
  }

});
