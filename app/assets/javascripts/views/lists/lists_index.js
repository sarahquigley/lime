Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .list button.complete-list" : "toggleCompleted",
    "click .list button.archive-list" : "toggleArchived",
    "click .list button.delete-list" : "delete"
  },

  template: JST['lists/index'],

  menuTemplate: JST['lists/menu'],

  render: function(){
    this.$el.html(this.template({
      lists: this.collection,
      menuTemplate: this.menuTemplate
    }));
    return this;
  },

  toggleCompleted: function(event){
    event.preventDefault();
    this.eventModel(event).toggleCompleted();
  },

  toggleArchived: function(event){
    event.preventDefault();
    this.eventModel(event).toggleArchived();
  },

  delete: function(event){
    event.preventDefault();
    var eventModel = this.eventModel(event);
    eventModel.destroy({
      success: function(){
        console.log('List deleted.')
      }
    })
  },

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.list').attr('data-list-id');
    return this.collection.get(eventModelId);
  }

});
