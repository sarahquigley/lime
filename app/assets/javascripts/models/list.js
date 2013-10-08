Lime.Models.List = Backbone.Model.extend({

  initialize: function(listData){
    Lime.Models.List.__super__.initialize.apply(this, arguments);
    var tasksData = listData ? listData.tasks : {};
    this.set("tasks", new Lime.Collections.Tasks(tasksData));
  },

  defaults: function(){
    return {
      tasks: new Lime.Collections.Tasks()
    }
  }

});
