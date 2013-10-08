Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){
    var that = this;
  },

  template: JST['lists/show'],

  render: function(){
    this.$el.html(this.template({
      list: this.model
    }));
    var tasksIndexView = new Lime.Views.TasksIndex({collection: this.model.get('tasks')});
    this.$el.append(tasksIndexView.render().$el);
    return this;
  }

})