Lime.Views.ListsIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .list button.edit-list" : "edit",
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

  edit: function(){
    event.preventDefault();
    var listFormView = new Lime.Views.ListForm({model: this.eventModel(event)});
    $(event.target).parents('.list').html(listFormView.render().$el);
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
