Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();

  if(this.nestedViews){
    _.each(this.nestedViews, function(view){
      if (view.close){
        view.close();
      }
    })
  }
}