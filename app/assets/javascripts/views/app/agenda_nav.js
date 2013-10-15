Lime.Views.AgendaNav = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
  },

  el: '#app-sidebar > #app-agendas',

  template: JST['agenda/index'],

  render: function(){
    this.$el.html(this.template({
    }));
    return this;
  }

});