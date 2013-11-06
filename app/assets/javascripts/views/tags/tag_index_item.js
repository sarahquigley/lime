// Purpose: Displays individual Tags
// Where? Main Content (Parent View: TagsIndexView)

Lime.Views.TagIndexItem = Backbone.View.extend(
  _.extend({}, Lime.Mixins.Updatable, Lime.Mixins.Deletable, Lime.Mixins.UI, {

  initialize: function(){
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.model, event, that.render)
    });
  },

  events: {
    "click .ddm .ddbutton": "dropMenu",
    "click .ddm .edit" : "edit",
    "click .ddm .delete" : "delete",
    "submit .tag-form": "update"
  },

  el: '<li class="tag">',

  templates: {
    indexItem: JST['tags/index_item'],
    menu: JST['tags/menu'],
    form: JST['tags/form'],
  },

  render: function(){
    this.$el.html(this.templates.indexItem({
      tag: this.model,
      menuTemplate: this.templates.menu,
      formTemplate: this.templates.form
    }));
    return this;
  }

}));
