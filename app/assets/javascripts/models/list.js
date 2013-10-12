Lime.Models.List = Backbone.Model.extend({

   defaults: function(){
    return {
      tasks: new Lime.Collections.Tasks()
    }
  },

  initialize: function(listData){
    Lime.Models.List.__super__.initialize.apply(this, arguments);
    var tasksData = listData ? listData.tasks : {};
    this.set("tasks", new Lime.Collections.Tasks(tasksData));
    this.modelName = "list";
  }

});
