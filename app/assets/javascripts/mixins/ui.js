Lime.Mixins.UI = {

  // Drops down menu
  dropMenu: function(event){
    console.log('moo');
    console.log($(event.target).closest('.ddmp'));
    $(event.target).closest('.ddmp').toggleClass('dropped');
  },

  // Close lightboxes
  closeLightbox: function(event){
    if(event.target === event.currentTarget){
      event.preventDefault();
      this.close();
    }
  }
}

