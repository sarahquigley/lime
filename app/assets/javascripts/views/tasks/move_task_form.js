Lime.Views.MoveTaskForm = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.UI, {

  initialize: function(options){
    this.parent = this.options.parent;
  },

  el: '<div id="move-task">',

  events: {
    "submit .move-task-form": "updateModel",
    "click .move-task-form .cancel": "closeLightbox",
    "click .lightbox-bg" : "closeLightbox"
  },

  template: JST['tasks/move'],

  render: function(){
    this.$el.html(this.template({
      task: this.model,
      lists: Lime.Live.Collections.lists
    }));
    return this;
  },

  updateModel: function(event){
    var that = this;
    this.update(event, function(){
      that.close();
      that.parent.trigger('change');
    });
  }

}));
