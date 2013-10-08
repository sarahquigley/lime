Lime.Views.TasksIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  template: JST['tasks/index'],

  render: function(){
    this.$el.html(this.template({
      tasks: this.collection
    }));
    return this;
  }

});