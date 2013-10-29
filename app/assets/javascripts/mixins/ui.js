Lime.Mixins.UI = {

  // Drops down menu
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  },

  // Close lightboxes
  closeLightbox: function(event){
    if(event.target === event.currentTarget){
      event.preventDefault();
      this.close();
    }
  }
}

