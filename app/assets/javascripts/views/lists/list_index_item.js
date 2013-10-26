// Purpose: Displays individual Lists
// Where? Sidebar (Parent View: ListsIndexView)

Lime.Views.ListIndexItem = Backbone.View.extend(
  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.Deletable , Lime.Mixins.UI, {

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];

    _(events).each(function (event){
      that.listenTo(that.model, event, that.render);
     });
  },

  events: {
    "click .app-drop-button": "dropMenu",
    "click .list-menu button.edit-list" : "edit",
    "click .list-menu button.toggle" : "toggleAttribute",
    "click .list-menu button.delete-list" : "deleteModel",
    "submit #list-form": "update"
  },

  el: '<li class="list">',

  templates: {
    indexItem: JST['lists/index_item'],
    menu: JST['lists/menu'],
    form: JST['lists/form'],
  },

  render: function(){
    this.$el.html(this.templates.indexItem({
      list: this.model,
      menuTemplate: this.templates.menu,
      formTemplate: this.templates.form
    }));
    return this;
  },

  /* These functions change the event model, and save those changes to the DB */

  // Delete the model
  deleteModel: function(event){
    this.delete(event, function(){
      Backbone.history.navigate('', {trigger: true})
    });
  }

}));
