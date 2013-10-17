// Purpose: Renders index of User's Tags
// Where? Main Content(no Parent View)

Lime.Views.TagsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'remove', 'change', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
      that.listenTo(that.model, event, that.render);  // NEEDED??
    });
  },

  events: {
    "submit .tag-form": "submit"
  },

  el: '#app-content',

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
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    this.collection.create(this.model, {
      wait: true,
      success: function(model, response){
        console.log('Tag created.');
        that.model = new Lime.Models.Tag();
      },
      error: function(model, errors, response){
        console.log('Error');
      }
    });
  }

})
