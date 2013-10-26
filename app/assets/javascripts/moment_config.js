moment.lang('en', {
  calendar : {
    lastDay : '[yesterday]',
    sameDay : '[today]',
    nextDay : '[tomorrow]',
    lastWeek : '[overdue]',
    nextWeek : 'dddd',
    sameElse : function(){
      var today = new Date();
      if(this.isBefore(today)){
        return '[overdue]';
      } else if (this.isSame(today, 'year')){
        return 'MMM D';
      } else {
        return 'll'
      }
    }
  }
});
