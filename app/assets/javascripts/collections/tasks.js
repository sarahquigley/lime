Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
    this.sortAttribute = "title";
  },

  model: Lime.Models.Task,
  url: '/tasks'

});