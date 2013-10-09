Lime.Views.AppSidebar = Backbone.View.extend({

  initialize: function(){

  },

  el: '<nav id="app-sidebar">',

  render: function(){
    var listsIndexView = new Lime.Views.ListsIndex({ collection: this.collection });
    var listFormView = new Lime.Views.ListForm({ collection: this.collection });
    this.$el.html(listsIndexView.render().$el);
    this.$el.append(listFormView.render().$el);
    return this;
  }

});