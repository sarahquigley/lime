Lime.Models.Note = Backbone.Model.extend({

  initialize: function(){
    this.modelName = 'note';
  },

  belongsTo: {
    task: function(){
      return Lime.Live.Collections.tasks ? Lime.Live.Collections.tasks : null;
    }
  },

  task: function(){
    if(this.belongsTo.task()){
      return this.belongsTo.task().where({id: this.get('task_id')});
    }
  },

  createdAtStr: function(){
    if(this.get('created_at')){
      var dueStr = moment(this.get('created_at')).calendar();
      return dueStr.toLowerCase();
    } else {
      return null;
    }
  },

  updatedAtStr: function(){
    if(this.get('updated_at')){
      var dueStr = moment(this.get('updated_at')).calendar();
      return dueStr.toLowerCase();
    } else {
      return null;
    }
  }

});
