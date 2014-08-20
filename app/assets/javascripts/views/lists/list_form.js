// Purpose: Renders form for creating new Lists
// Where? Sidebar (no Parent View)

Lime.Views.ListForm = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Creatable, {

    initialize: function(){
    },

    events: {
      'submit .new-list-form': 'submit'
    },

    el: '#app-sidebar > #lists-form-container',

    template: JST['lists/form'],

    render: function(){
      this.$el.html(this.template({
        cssClass: "new-list-form",
        list: this.model
      }));
      return this;
    },

    // Submit new list

    submit: function(event){
      event.preventDefault();
      var that = this;
      this.create(event, {
        success: function(model, response){
          that.model = new Lime.Models.List();
          Backbone.history.navigate(model.url(), {trigger: true});
        }
      });
    }

}));
