Lime.Models.List = Backbone.Model.extend({

   defaults: function(){
    return {
      tasks: new Lime.Collections.Tasks()
    }
  },

  initialize: function(){
    //this.tasks = nestCollection(this, 'tasks', new Lime.Collections.Tasks(this.get('tasks')));
    this.modelName = "list";
  }

});
