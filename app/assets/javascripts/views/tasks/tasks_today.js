Lime.Views.TasksToday = Backbone.View.extend({

  initialize: function(){
  },

  el: '<section id="app-content"><section id="featured-list></section><section"',

  template: JST['tasks/today'],

  render: function(){
    this.$el.html(this.template({
    }));
    var tasksIndexView = new Lime.Views.TasksIndex({
      collection: this.collection
    });
    this.$el.append(tasksIndexView.render().$el);
    return this;
  }

})