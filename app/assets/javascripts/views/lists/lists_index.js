Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){

  },

  template: JST['lists/index'],

  render: function(){
    this.$el.html(this.template({
      lists: this.collection
    }));
    return this;
  }

});
