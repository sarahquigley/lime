Lime.Models.Tag = Backbone.Model.extend({

  initialize: function(listData){
    this.modelName = "tag";
    this.tasks = null;
  },

  task_count: function(){
    var that = this
    if(this.tasks){

      return this.tasks.filter(function(task){
        return task.has('tags') && _.findWhere( task.get('tags'), { id: that.get('id') } );
      }).length;

    } else {
      return null;
    }
  }

});
