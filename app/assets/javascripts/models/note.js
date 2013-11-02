Lime.Models.Note = Backbone.Model.extend({

  initialize: function(){
    this.modelName = 'note';
    this.belongsTo.task = Lime.Live.tasks ? Lime.Live.task : null;
  },

  belongsTo: {
    task: null
  },

  task: function(){
    if(this.belongsTo.task){
      return this.belongsTo.task.where({id: this.get('task_id')});
    }
  }

});
