Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
    this.filtered = this.models;
  },

  comparator: "title",

  model: Lime.Models.Task,
  url: '/tasks'

});