Lime.Views.TagsIndex = Backbone.View.extend({

  initialize: function(){
    this.nestedViews = [];
    var that = this;
    var events = ['add', 'remove', 'change'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
      that.listenTo(that.model, event, that.render)
    });
  },

  events: {
    "submit #tag-form": "submit"
  },

  el: '#app-content',

  template: JST['tags/index'],
  formTemplate: JST['tags/form'],

  render: function(){
    var that = this;

    // Close all previously nested views and reset this.nestedViews
    _.each(this.nestedViews, function(view){ view.close() });
    this.nestedViews = [];

    // Create <ul> to contain <li> items for every model in the collection
    var $ul = $('<ul id="tags">');

    // Add <li> items for every model in the collection
    this.collection.each(function(model){
      var tagIndexItemView = new Lime.Views.TagIndexItem({
        model: model
      });
      that.nestedViews.push(tagIndexItemView);
      $ul.append(tagIndexItemView.render().$el);
    });

    // Insert template & populated <ul>
    this.$el.empty();
    this.$el.append(this.template({})).append($ul);

    // Append form
    this.$el.append(this.formTemplate({
      tag: this.model
    }));

    return this;
  },

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
