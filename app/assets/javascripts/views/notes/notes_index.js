Lime.Views.NotesIndex = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Creatable, Lime.Mixins.UI, {

  initialize: function(){
    var that = this;
    this.nestedViews = [];
    this.newNote = new Lime.Models.Note();

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
      that.listenTo(that.model, event, that.render);
    });
  },

  events: {
    "click .lightbox-bg" : "closeLightbox",
    "submit .new-note-form" : "submit"
  },

  el: '<div id="notes-container">',

  templates: {
    index: JST['notes/index'],
    form: JST['notes/form'],
    nny: JST['notes/no_notes_yet']
  },

  render: function(){
    this.resetNestedViews();
    this.$el.html(this.templates.index({
      task: this.model
    }));
    this.$el.find('.lightbox').append(this.renderCollection()); 
    this.$el.find('.lightbox').append(this.templates.form({
      note: this.newNote,
      cssClass: 'new-note-form'
    })); 
    return this;
  },

  renderCollection: function(){
    if(this.model.notes().length > 0){

      $ul = $('<ul id="notes">');

      var that = this;

      _.each(this.model.notes(), function(note){
        var noteIndexItemView = new Lime.Views.NoteIndexItem({
          model: note,
          parent: that.model
        }); 
        that.nestedViews.push(noteIndexItemView);
        $ul.append(noteIndexItemView.render().$el);
      });

      return $ul;

    } else {
      return this.templates.nny({});
    }
  },

  // Submit new note
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    this.newNote.set(attrs);

    this.collection.url = '/tasks/' + this.model.get('id') + '/notes';
    this.collection.create(this.newNote, {
      wait: true,
      success: function(model, response){
        console.log('Note created.');
        that.collection.url = '/notes';
        that.model.trigger('change');
        that.newNote = new Lime.Models.Note();
      },
      errors: function(model, errors){
        console.log(errors);
      }
    });
  }

}));
