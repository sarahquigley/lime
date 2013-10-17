Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
  },

  comparator: "title",

  filtered: function(){
    return this.models();
  },

  model: Lime.Models.Task,
  url: '/tasks'

});