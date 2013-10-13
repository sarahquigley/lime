Lime.Collections.Tags = Backbone.Collection.extend({
  
  initialize: function(){
    this.sortAttribute = "name";
  },

  model: Lime.Models.Tag,
  url: "/tags"

});
