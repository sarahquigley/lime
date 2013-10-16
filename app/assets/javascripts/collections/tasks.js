Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
  },

  comparator: "title",

  model: Lime.Models.Task,
  url: '/tasks'

});