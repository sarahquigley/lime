Lime.Views.TagForm = Backbone.View.extend({

  options: function(){
    return {
      model: new Lime.Models.Tag()
    };
  },

  initialize: function(){
  },

  events: {
    "submit #tag-form": "submit"
  },

  el: '<div id="task-form-container" >',

  template: JST['tags/form'],

  render: function(){
    this.$el.html(this.template({
      tag: this.model
    }));

    return this;
  },

  submit: function(){
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    this.collection.create(this.model, {
      wait: true,
      success: function(model){
        console.log('Tag created.');
      },
      error: function(model, errors){
        console.log(errors);
      }
    });
  }

});
