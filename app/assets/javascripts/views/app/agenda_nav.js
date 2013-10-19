// Purpose: Renders some misc. sidebar menu items
// Where? Sidebar (no Parent View)

Lime.Views.AgendaNav = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
  },

  events: {
    "keypress .search" : "search",
    "click #meta .app-drop-button": "dropMenu"
  },

  el: '#app-sidebar > #app-agendas',

  template: JST['agenda/index'],

  render: function(){
    this.$el.html(this.template({
    }));
    return this;
  },

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  search: function(event){
    if(event.keyCode == 13){
      var search = $(event.target).val();
      var type = search[0];
      var term = search.slice(1);
      if( type == '@'){
        Backbone.history.navigate('tags/' + term, { trigger: true });
      } else if (type == '!'){
        Backbone.history.navigate('priority/' + term, { trigger: true });
      } else if (type == '&'){
        Backbone.history.navigate('agenda/' + term, { trigger: true });
      }
    }
  }

});