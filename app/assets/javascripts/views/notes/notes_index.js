Lime.Views.NotesIndex = Backbone.View.extend(

  _.extend({}, Lime.Mixins.Creatable, Lime.Mixins.UI, {

  initialize: function(){
    var that = this;
    this.nestedViews = [];

    var events = ['add', 'change', 'remove', 'sync'];
    _(events).each(function(event){
      that.listenTo(that.collection, event, that.render);
    });
  },

  events: {
    "click .lightbox-bg" : "closeLightbox"
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
  }

}));
