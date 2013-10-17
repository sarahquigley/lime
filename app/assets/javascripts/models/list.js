Lime.Models.List = Backbone.Model.extend({

  initialize: function(){
    this.modelName = "list";
    this.hasMany.tasks = Lime.Live.Collections.tasks ? Lime.Live.Collections.tasks : 0;
  },

  hasMany: {
    tasks: null
  },

  tasks: function(){
    if(this.hasMany.tasks){
      return this.hasMany.tasks.where({list_id: this.get('id')});
    }
  }

});
