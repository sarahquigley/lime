Lime.Views.ListIndexItem = Backbone.View.extend({

  initialize: function(){
    var that = this;
    var events = ['add', 'change', 'remove'];
    _(events).each(function (event){
      that.listenTo(that.model, event, that.render)
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

  template: JST['lists/index_item'],
  menuTemplate: JST['lists/menu'],
  formTemplate: JST['lists/form'],

  render: function(){
    this.$el.html(this.template({
      list: this.model,
      menuTemplate: this.menuTemplate,
      formTemplate: this.formTemplate
    }));
    return this;
  },

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  switchView: function(){
    event.preventDefault();
    this.$el.children('.list-show').toggleClass('hidden');
    this.$el.children('.list-edit').toggleClass('hidden');
  },

  edit: function(event){
    console.log('Editing List');
    event.preventDefault();
    this.switchView();
  },

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

  toggle: function(event){
    event.preventDefault();
    var attribute = $(event.target).attr('data-toggle');
    this.model.toggleAttribute(attribute);
  },

  delete: function(event){
    this.model.destroy({
      success: function(){
        console.log('List deleted.');
        Backbone.history.navigate('', {trigger: true})
      }
    })
  }

});
