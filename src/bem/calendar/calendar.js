import 'air-datepicker';

class Calendar
{
   constructor($component)
   {
      this.$component = $component;
      
      let datePicker = $($component).datepicker({
         inline: true,
         range: true,
         multipleDatesSeparator: '-',
         clearButton: true,
         todayButton: true,
         showOtherYears: false,
         navTitles: {
            days: 'MM <i>yyyy</i>',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
         },

         onRenderCell: function(date, cellType) {

            if(cellType == 'day') {
            
               let d = date.getDate(),
                   m = date.getMonth(),
                   y = date.getFullYear();

               let isSpecial = false;

               if(d == 8 && m == 7 && y == 2019)
                  isSpecial = true;

               return {
                  html: `<div class="calendar__cell-content">${date.getDate()}</div>`,
                  classes: isSpecial ? 'calendar__cell_special' : 'calendar__cell'
               }
            }
         },
      }).data('datepicker');

      $($('.datepicker--button', $component)[0]).html('применить');

      datePicker.selectDate(new Date(2019, 7, 19));
      datePicker.selectDate(new Date(2019, 7, 23));

      // -haxx- zone
      // If air-datepicker updates one day,
      // following code might become defective

      datePicker.today = () => {
         datePicker.hide();
      };

      datePicker.nav.d.$nav.on('click', '.datepicker--nav-title', () => {});
      datePicker.nav.d.$nav.prop('click', null);
   }
}

$(function() {
   $('.calendar_inline').each((index, node) => {
      return new Calendar(node);
   });
});