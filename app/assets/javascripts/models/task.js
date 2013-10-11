Lime.Models.Task = Backbone.Model.extend({

  initialize: function(){
  },

  toggleCompleted: function(){
    this.toggleAttribute('completed');
  },

  toggleArchived: function(){
    this.toggleAttribute('archived');
  },

  toggleAttribute: function(attribute){
    var options = {task:{}};
    options[attribute] = !this.get(attribute);
    options["task"][attribute] = !this.get(attribute);
    this.save(options, {
      success: function(){
        console.log('Toggled task ' + attribute + '.');
      }
    });
  },

  doItToday: function(){
    this.save({
      due: new Date(),
      task: { due: new Date() }
    } , {
      success: function(){
        console.log('Due date set for today.')
      }
    });
  },

  postpone: function(){
    var currentDate = this.get('due') ? new Date(this.get('due')) : new Date();
    var newDueDate = new Date(currentDate.getTime() + 86400000);
    this.save({
      due: newDueDate,
      task: { due: newDueDate }
    } , {
      success: function(){
        console.log('Task postponed.')
      }
    });
  }

});