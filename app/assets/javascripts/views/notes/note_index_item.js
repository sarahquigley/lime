Lime.Views.NoteIndexItem = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.Deletable, Lime.Mixins.UI, {

  initialize: function(){
    var that = this;
    this.parent = this.options.parent;

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render);
      that.listenTo(that.parent, event, that.render);
    });
  },

  events: {
    "click .note-menu .edit-note" : "toggleEdit",
    "click .note-menu .delete-note" : "deleteModel",
    "submit .edit-note-form" : "update"
  },

  el: '<li class="note">',

  templates: {
    indexItem: JST['notes/index_item'],
    form: JST['notes/form']
  },

  render: function(){
    this.$el.html(this.templates.indexItem({
      note: this.model,
      cssClass: "edit-note-form",
      formTemplate: this.templates.form
    }));
    return this;
  },

  // Delete the model
  deleteModel: function(event){
    var that = this;
    this.delete(event, function(){
      that.parent.trigger('change');
    });
  }

}));
