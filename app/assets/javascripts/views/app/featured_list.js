Lime.Views.AppFeaturedList = Backbone.View.extend({

  initialize: function(){
    this.featuredListId = this.options.featuredListId;
  },

  el: '<section id="app-content">',

  render: function(){
    var listShowView = new Lime.Views.ListShow({ model: this.collection.get(this.featuredListId) });
    var taskFormView = new Lime.Views.TaskForm({ list: this.collection.get(this.featuredListId) });
    this.$el.html(listShowView.render().$el);
    this.$el.append(taskFormView.render().$el);
    return this;
  }

});