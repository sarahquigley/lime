Lime.Views.TaskForm = Backbone.View.extend({

  options: function(){
    return {
      model: new Lime.Models.Task()
    };
  },

  initialize: function(list){
  },

  events: {
    "submit #task-form": "submit"
  },

  el: '<div id="task-form-container" >',

  template: JST['tasks/form'],

  render: function(){
    this.$el.html(this.template({
      task: this.model
    }));
    return this;
  },

  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);
    // I want a smarter method of changing the collection url for this...

    if (this.model.isNew()){
      this.collection = this.options.list.get('tasks');
      this.collection.url = '/lists/' + this.options.list.get('id') + '/tasks';
      this.collection.create(this.model, {
        success: function(){
          console.log('Task created.');
          that.collection.url = '/tasks';
          event.target.reset();
        }
      });
    } else {
      this.model.save({}, {
        success: function(){
          console.log('Task updated');
          event.target.reset();
        }
      })
    }
  }

});