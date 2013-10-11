Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
  },

  el: '<section id="featured-list">',

  template: JST['lists/show'],

  render: function(){
    this.$el.html(this.template({
      list: this.model
    }));
    var tasksIndexView = new Lime.Views.TasksIndex({
      collection: this.model.get('tasks')
    });
    this.nestedViews = [tasksIndexView];
    this.$el.append(tasksIndexView.render().$el);
    return this;
  }

})