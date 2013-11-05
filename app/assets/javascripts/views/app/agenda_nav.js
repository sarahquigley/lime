// Purpose: Renders some misc. sidebar menu items
// Where? Sidebar (no Parent View)

Lime.Views.AgendaNav = Backbone.View.extend(
  _.extend({}, Lime.Mixins.UI, {

    initialize: function(){
      this.nestedViews = [];
    },

    events: {
      "keypress .search" : "search",
      "click #meta .app-drop-button": "dropMenu"
    },

    el: '#sidebar > #agendas',

    template: JST['agenda/index'],

    render: function(){
      this.$el.html(this.template({
      }));
      return this;
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

}));
