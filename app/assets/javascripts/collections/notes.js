Lime.Collections.Notes = Backbone.Collection.extend({
  
  initialize: function(){
  },
  
  comparator: 'created_at',
  
  url: '/notes',
  model: Lime.Models.Note,

  filtered: function(){
    return this.models();
  }
  
});
