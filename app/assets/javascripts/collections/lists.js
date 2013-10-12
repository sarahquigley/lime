Lime.Collections.Lists = Backbone.Collection.extend({

  initialize: function(){
    this.sortAttribute = "title";
  },

  model: Lime.Models.List,
  url: "/lists"

});
