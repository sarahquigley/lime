Lime.Views.TasksAgenda = Backbone.View.extend({

  options: function(){
    return {
      agenda: "Today"
    };
  },

  initialize: function(options){
    this.collection = this.collection.collectionWhere({due_to_s: this.options.agenda});
  },

  el: '<section id="app-content"><section id="featured-list></section><section"',

  template: JST['agenda/show'],

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