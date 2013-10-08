Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ["add", "change", "remove"];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  template: JST['lists/index'],

  render: function(){
    this.$el.html(this.template({
      lists: this.collection
    }));
    return this;
  }

});
