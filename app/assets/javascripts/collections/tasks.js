Lime.Collections.Tasks = Backbone.Collection.extend({
  
  initialize: function(){
  },

  comparator: "title",

  model: Lime.Models.Task,
  url: '/tasks',

  filtered: function(){
    return this.models();
  },

  group: function(){
    return this.filtered();
  },

  groups: {

    main: {
      title: null,
      display: true,
      augmentable: true,
      group: function(){
        return _.filter(this.filtered(), function(task){
          return !task.get('completed') && !task.get('archived');
        });
      }
    },

    completed: {
      title: "completed",
      display: true,
      augmentable: false,
      group: function(collection){
        return _.filter(this.filtered(), function(task){
          return task.get('completed') && !task.get('archived');
        });
      }
    },

    archived: {
      title: "archived",
      display: false,
      augmentable: false,
      group: function(collection){
        return _.filter(this.filtered(), function(task){
          return task.get('archived');
        });
      }
    }
  }

});
