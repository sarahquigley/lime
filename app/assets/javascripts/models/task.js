Lime.Models.Task = Backbone.Model.extend({

  initialize: function(){
    // if(this.get('due')){
    //   this.dueDisplay();
    // }
  },

  toggleCompleted: function(){
    this.save({
      completed: !this.get('completed')
    }, {
      success: function(){
        console.log('Toggled task completed.');
      }
    });
  },

  toggleArchived: function(){
    this.save({
      archived: !this.get('archived')
    }, {
      success: function(){
        console.log('Toggled task archived.');
      }
    });
  },

  doItToday: function(){
    this.save({
      due: new Date()
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
      due: newDueDate
    } , {
      success: function(){
        console.log('Task postponed.')
      }
    });
  }

});