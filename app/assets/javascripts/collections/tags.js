Lime.Collections.Tags = Backbone.Collection.extend({

  initialize: function(){
  },

  comparator: "name",

  model: Lime.Models.Tag,
  url: "/tags"

});
