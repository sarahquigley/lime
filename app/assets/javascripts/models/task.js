Lime.Models.Task = Backbone.Model.extend({

   defaults: function(){
    return {
      tags: new Lime.Collections.Tags()
    }
  },

  initialize: function(taskData){
    Lime.Models.Task.__super__.initialize.apply(this, arguments)
    var tagsData = taskData ? taskData.tags : {};

    this.set("tags", new Lime.Collections.Tags(tagsData));
    this.modelName = "task";
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
        /// badd
        that.set('tags', new Lime.Collections.Tags(response.tags));
      }
    });
  },

});