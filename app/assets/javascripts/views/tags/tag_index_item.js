// Purpose: Displays individual Tags
// Where? Main Content (Parent View: TagsIndexView)

Lime.Views.TagIndexItem = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render)
    });
  },

  events: {
    "click .tag-menu .app-drop-button": "dropMenu",
    "click .tag-menu .edit-tag" : "edit",
    "click .tag-menu .delete-tag" : "delete",
    "submit .tag-form": "update"
  },

  el: '<li class="tag">',

  template: JST['tags/index_item'],
  menuTemplate: JST['tags/menu'],
  formTemplate: JST['tags/form'],

  render: function(){
    this.$el.html(this.template({
      tag: this.model,
      menuTemplate: this.menuTemplate,
      formTemplate: this.formTemplate
    }));
    return this;
  },

  /* These functions alter the way the view is displayed */

  // Drops down then tag item menus
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Toggles between displaying the tag item / displaying a form for editing the tag item
  switchView: function(){
    this.$el.children('.tag-show').toggleClass('hidden');
    this.$el.children('.tag-edit').toggleClass('hidden');
  },

  // Switches to display the edit form for the tag item when edit button (in menu) is clicked
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

    this.model.save({}, {
      success: function(model){
        console.log('Tag updated.');
        that.switchView();    // May not be needed
      }
    });
  },

  // Delete the model
  delete: function(event){
    event.preventDefault();
    this.model.destroy({
      success: function(){
        console.log('Tag destroyed');
      }
    });
  }

})
