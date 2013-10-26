moment.lang('en', {
  calendar : {
    lastDay : '[yesterday]',
    sameDay : '[today]',
    nextDay : '[tomorrow]',
    lastWeek : '[overdue]',
    nextWeek : 'dddd',
    sameElse : function(){
      if(this.isSame(new Date(), 'year')){
        return 'MMM D';
      } else {
        return 'll'
      }
    }
  }
});
