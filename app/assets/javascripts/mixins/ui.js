Lime.Mixins.UI = {

  // Drops down menu
  dropMenu: function(event){
    event.stopPropagation();
    var dropped = $(event.target).closest('.app-drop-parent').hasClass('dropped');
    
    $('.app-drop-parent').removeClass('dropped');
    if(!dropped){
      $(event.target).closest('.app-drop-parent').addClass('dropped');
    }
      
  },

  closeMenu: function(event){
    $('.app-drop-parent').removeClass('dropped');
  },

  // Close lightboxes
  closeLightbox: function(event){
    if(event.target === event.currentTarget){
      event.preventDefault();
      this.close();
    }
  }
}

