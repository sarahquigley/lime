Lime.Views.TagsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .tag-menu .app-drop-button": "dropMenu",
    "click .tag-menu .edit-tag" : "edit",
    "click .tag-menu .delete-tag" : "delete"
  },

  el: $('<section id="app-content">'),

  template: JST['tags/index'],
  menuTemplate: JST['tags/menu'],

  render: function(){
    this.$el.html(this.template({
      tags: this.collection,
      menuTemplate: this.menuTemplate
    }));
    var tagFormView = new Lime.Views.TagForm({
        collection: this.collection
    });
    this.nestedViews = [tagFormView];
    this.$el.append(tagFormView.render().$el);
    return this;
  },

  // Drop Menu (needs click outside collapse)

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  edit: function(event){
    event.preventDefault();
    var tagFormView = new Lime.Views.TagForm({ model: this.eventModel(event) });
    $(event.target).parents('.tag').html(tagFormView.render().$el);
  },

  delete: function(event){
    event.preventDefault();
    this.eventModel(event).destroy({
      success: function(){
        console.log('Tag destroyed');
      }
    });
  },

  eventModel: function(event){
    var eventModelId = $(event.target).parents('.tag').attr('data-tag-id');
    return this.collection.get(eventModelId);
  }

})
