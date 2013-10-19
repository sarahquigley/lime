Lime.Collections.Lists = Backbone.Collection.extend({

  initialize: function(){
  },

  comparator: "title",

  model: Lime.Models.List,
  url: "/lists"

});
