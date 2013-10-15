Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .app-drop-button": "dropMenu",
    "click .list-menu button.edit-list" : "edit",
    "click .list-menu button.toggle" : "toggle",
    "click .list-menu button.delete-list" : "delete"
  },

  el: '#app-sidebar > #lists-container',

  template: JST['lists/index'],

  menuTemplate: JST['lists/menu'],

  render: function(){
    this.$el.html(this.template({
      lists: this.collection,
      menuTemplate: this.menuTemplate
    }));
    return this;
  },

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  edit: function(){
    event.preventDefault();
    var listFormView = new Lime.Views.ListForm({model: this.eventModel(event)});
    $(event.target).parents('.list').html(listFormView.render().$el);
  },

  // Toggles

  toggle: function(event){
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.eventModel(event).toggleAttribute(attribute);
  },


  delete: function(event){
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.destroy({
      success: function(){
        console.log('List deleted.');
        Backbone.history.navigate('', {trigger: true})
      }
    })
  },

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.list').attr('data-list-id');
    return this.collection.get(eventModelId);
  }

});
