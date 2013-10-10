Lime.Collections.Tasks = Backbone.Collection.extend({

  model: Lime.Models.Task,
  url: '/tasks',
  //
  // remaining: function(){
  //   return this.collectionWhere({completed: false});
  // },
  //
  // completed: function(){
  //   return this.collectionWhere({completed: true});
  // },
  //
  // unarchived: function(){
  //   return this.collectionWhere({archived: false});
  // },
  //
  // archived: function(){
  //   return this.collectionWhere({completed: true});
  // },
  //
  // today: function(){
  //   return this.collectionWhere({due_to_s: "Today"});
  // },
  //
  // tomorrow: function(){
  //   return this.collectionWhere({due_to_s: "Tomorrow"});
  // },

  collectionWhere: function(options){
    return new Lime.Collections.Tasks(this.where(options));
  }
});