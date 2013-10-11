Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
    this.sortAttribute = "title";
  },

  model: Lime.Models.Task,
  url: '/tasks',

  collectionWhere: function(options){
    return new Lime.Collections.Tasks(this.where(options));
  }

});