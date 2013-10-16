// Purpose: Displays individual Lists
// Where? Sidebar (Parent View: ListsIndexView)

Lime.Views.ListIndexItem = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.model.get('tasks'), event, that.render);
    });
  },

  events: {
    "click .app-drop-button": "dropMenu",
    "click .list-menu button.edit-list" : "edit",
    "click .list-menu button.toggle" : "toggle",
    "click .list-menu button.delete-list" : "delete",
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

  /* These functions alter the way the view is displayed */

  // Drops down then list item menus
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Toggles between displaying the list item / displaying a form for editing the list item
  switchView: function(){
    this.$el.children('.list-show').toggleClass('hidden');
    this.$el.children('.list-edit').toggleClass('hidden');
  },

  // Switches to display the edit form for the list item when edit button (in menu) is clicked
  edit: function(event){
    event.preventDefault();
    this.switchView();
  },


  /* These functions change the event model, and save those changes to the DB */

  // Update the model on form submission
  update: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    var that = this;
    this.model.save({}, {
      success: function(){
        console.log('List updated');
        that.switchView();
      }
    });
  },

  // Toggle individual attributes of the model
  toggle: function(event){
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.model.toggleAttribute(attribute);
  },

  // Delete the model
  delete: function(event){
    this.model.destroy({
      success: function(){
        console.log('List deleted.');
        Backbone.history.navigate('', {trigger: true})
      }
    })
  }

});
