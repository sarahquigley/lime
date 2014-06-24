// Purpose: Renders index of User's Tags
// Where? Main Content(no Parent View)

Lime.Views.TagsIndex = Backbone.View.extend(
  
  _.extend({}, Lime.Mixins.Creatable, {

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'remove', 'change', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
    });
  },

  events: {
    "submit .tag-form": "submit"
  },

  el: '#content',

  templates: {
    index: JST['tags/index'],
    form: JST['tags/form'],
  },

  render: function(){   // Refactor into methods
    this.resetNestedViews();

    // Insert template & rendered collection
    this.$el.empty();
    this.$el.append(this.templates.index({}));
    this.$el.append(this.renderCollection());

    // Append form
    this.$el.append(this.templates.form({
      tag: this.model
    }));

    return this;
  },

  // Helper method, called by render
  renderCollection: function(){
    var that = this;

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tags">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      //model.tasks = Lime.Live.Collections.tasks;
      var tagIndexItemView = new Lime.Views.TagIndexItem({
        model: model
      });
      that.nestedViews.push(tagIndexItemView);
      $ul.append(tagIndexItemView.render().$el);
    });

    return $ul;
  },

  // Submit new tags

  submit: function(event){
    event.preventDefault();
    var that = this;
    this.create(event, {
      success: function(){
        that.model = new Lime.Models.Tag();
      }
    });
  }

}));
