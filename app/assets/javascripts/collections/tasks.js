Lime.Collections.Tasks = Backbone.Collection.extend({

  model: Lime.Models.Task,
  url: '/tasks',

  remaining: function(){
    return this.whereCollection({completed: false});
  },

  completed: function(){
    return this.whereCollection({completed: true});
  },

  unarchived: function(){
    return this.whereCollection({archived: false});
  },

  archived: function(){
    return this.whereCollection({completed: true});
  },

  today: function(){
    return this.whereCollection({due_to_s: "Today"});
  },

  tomorrow: function(){
    return this.whereCollection({due_to_s: "Tomorrow"});
  },

  whereCollection: function(options){
    return new Lime.Collections.Tasks(this.where(options));
  }
});