Lime.Views.TagsIndex = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render)
    });
  },

  events: {
    "click .task-menu .app-drop-button": "dropmenu",
    "click .tag-menu .edit-tag" : "edit",
    "click .tag-menu .delete-tag" : "delete"
  },

  el: $('<div id="tags-container">'),

  template: JST['tags/index'],
  menuTemplate: JST['tags/menu'],

  render: function(){
    this.$el.html(this.template({
      tags: this.collection,
      menuTemplate: this.menuTemplate
    }));
    return this;
  },

  // Drop Menu (needs click outside collapse)

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  edit: function(){

  },

  delete: function(){

  }

})
