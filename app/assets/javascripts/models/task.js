Lime.Models.Task = Backbone.Model.extend({

  initialize: function(){
    this.modelName = "task";
    this.belongsTo.list = Lime.Live.Collections.lists ? Lime.Live.Collections.lists : null;
    this.hasMany.tags = Lime.Live.Collections.tags ? Lime.Live.Collections.tags : null;
    console.log(this.get('title') + this.get('due') + this.dueStr());
  },

  belongsTo: {
    list: null
  },

  list: function(){
    if(this.belongsTo.list){
      return this.belongsTo.list.where({id: this.get('list_id')})
    }
  },

  hasMany: {
    tags: null
  },

  tags: function(){
    if(this.hasMany.tags){
      var that = this;
      if(this.has('tags')){
        return this.hasMany.tags.filter(function(tag){
          return _.contains(_.pluck(that.get('tags'), 'id'), tag.get('id'));
        });
      }
    }
  },
  
  dueStr: function(){
    if(this.get('due')){
      return moment(this.get('due')).calendar();
    } else {
      return null;
    }
  },

  doItToday: function(){
    this.setDue(new Date());
  },

  postpone: function(){
    var currentDate = this.get('due') ? new Date(this.get('due')) : new Date();
    var newDueDate = new Date(currentDate.getTime() + 86400000);
    this.setDue(newDueDate);
  },

  setDue: function(newDueDate){
    var that = this;
    this.save({
      due: newDueDate,
      task: { due: newDueDate }
    } , {
      success: function(model, response){
        console.log('Due date set for ' + newDueDate + '.');
      }
    });
  },

});
