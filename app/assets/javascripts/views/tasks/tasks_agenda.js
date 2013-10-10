Lime.Views.TasksAgenda = Backbone.View.extend({

  initialize: function(){
  },

  el: '<section id="app-content"><section id="featured-list></section><section"',

  template: JST['tasks/agenda'],

  render: function(){
    this.$el.html(this.template({
      agenda: this.options.agenda
    }));
    var tasksIndexView = new Lime.Views.TasksIndex({
      collection: this.collection
    });
    this.$el.append(tasksIndexView.render().$el);
    return this;
  }

})