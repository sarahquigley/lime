Lime.Views.ListShow = Backbone.View.extend({

  initialize: function(){

  },

  template: JST['lists/show'],

  render: function(){
    this.$el.html(this.template({
      list: this.model
    }));
    return this;
  }

})