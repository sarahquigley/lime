Lime.Models.List = Backbone.Model.extend({

  initialize: function(listsData){
    Lime.Models.List.__super__.initialize.apply(this, arguments);
    this.attributes.tasks = new Lime.Collections.Tasks(listsData.tasks);
  },

});
