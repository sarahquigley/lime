Lime.Views.AgendaNav = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
  },

  el: '<div id="app-agendas">',

  template: JST['agenda/index'],

  render: function(){
    this.$el.html(this.template({
    }));
    // var listsIndexView = new Lime.Views.ListsIndex({ collection: this.collection });
    // var listFormView = new Lime.Views.ListForm({ collection: this.collection });
    // this.nestedViews = [listsIndexView, listFormView];
    // this.$el.append(listsIndexView.render().$el);
    // this.$el.append(listFormView.render().$el);
    return this;
  }

});