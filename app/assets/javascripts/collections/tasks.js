Lime.Collections.Tasks = Backbone.Collection.extend({

  initialize: function(){
    this.sortAttribute = "title";
  },

  model: Lime.Models.Task,
  url: '/tasks',

  comparator: function(model1, model2){
    model1 = model1.get(this.sortAttribute);
    model2 = model2.get(this.sortAttribute);
    return model1 > model2 ?  1 : model1 < model2 ? -1 : 0;
  },

  collectionWhere: function(options){
    return new Lime.Collections.Tasks(this.where(options));
  },

  sortCollection: function(attribute){
    this.sortAttribute = attribute;
    this.sort();
  }

});