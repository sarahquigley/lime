Lime.Mixins.UI = {

  // Drops down menu
  dropMenu: function(event){
    $(event.target).closest('.app-drop-parent').toggleClass('dropped');
  }

}

