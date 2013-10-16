Lime.Views.TaskForm = Backbone.View.extend({

  options: function(){
    return {
      model: new Lime.Models.Task()
    };
  },

  initialize: function(list){
    this.tags = this.options.tags;
  },

  events: {
    "submit .task-form": "submit",
  },

  el: '<div id="task-form-container" >',

  template: JST['tasks/form'],

  render: function(){
    this.$el.html(this.template({
      task: this.model,
      tags: this.tags
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
        success: function(model, response){
          console.log('Task created.');
          model.set('tags', new Lime.Collections.Tags(response.get('tags')));
          that.collection.url = '/tasks';
          event.target.reset();
        },
        errors: function(model, errors){
          console.log(errors);
        }
      });
    } else {
      this.model.save({}, {
        success: function(model, response){
          console.log('Task updated');
          model.set('tags', new Lime.Collections.Tags(response.tags));
          event.target.reset();
        },
        errors: function(model, errors){
          console.log(errors);
        }
      })
    }
  }

});