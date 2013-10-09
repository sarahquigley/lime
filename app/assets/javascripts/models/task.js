Lime.Models.Task = Backbone.Model.extend({

  initialize: function(){

  },

  toggleCompleted: function(){
    this.save({
      completed: !this.get('completed')
    }, {
      success: function(){
        console.log('Toggled task completed.');
      }
    })
  },

  toggleArchived: function(){
    this.save({
      archived: !this.get('archived')
    })
  }

});