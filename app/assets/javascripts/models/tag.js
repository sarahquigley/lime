Lime.Models.Tag = Backbone.Model.extend({

  initialize: function(listData){
    this.modelName = "tag";
    this.hasMany.tasks = Lime.Live.Collections.tasks ? Lime.Live.Collections.tasks : null;
  },

  hasMany: {
    tasks: null
  },

  tasks: function(){
    var that = this;
    if( this.hasMany.tasks ){
      return this.hasMany.tasks.filter(function(task){
        return task.has('tags') && _.findWhere( task.get('tags'), { id: that.get('id') } );
      });
    }
  }

});
