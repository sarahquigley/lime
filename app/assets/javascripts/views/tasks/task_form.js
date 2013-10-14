Lime.Views.TaskForm = Backbone.View.extend({

  options: function(){
    return {
      model: new Lime.Models.Task()
    };
  },

  initialize: function(list){
  },

  events: {
    "submit #task-form": "submit",
    "click .task-priority-menu .app-drop-button": "dropMenu"
  },

  el: '<div id="task-form-container" >',

  template: JST['tasks/form'],

  render: function(){
    this.$el.html(this.template({
      task: this.model
    }));
    return this;
  },

  // Drop Menu (needs click outside collapse)

  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.model.set(attrs);

    if (this.model.isNew()){
      this.collection = this.options.list.get('tasks');
      this.collection.url = '/lists/' + this.options.list.get('id') + '/tasks';

      this.collection.create(this.model, {
        wait: true,
        success: function(){
          console.log('Task created.');
          that.model.set('tags', new Lime.Collections.Tags());
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