Lime.Views.NotesIndex = Backbone.View.extend({

  initialize: function(){

  },

  el: '<div id="notes">',

  templates: {
    index: JST['notes/index']
  },

  render: function(){
    this.$el.html(this.templates.index({
    }));
    return this;
  }

});
