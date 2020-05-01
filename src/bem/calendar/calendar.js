import 'air-datepicker/dist/css/datepicker.css';
import './calendar.scss';
import 'air-datepicker';

$(function() {

   let $start = $('#start'),
       $end   = $('#end');

   let picker = $('#start').datepicker({
      range: true,
     multipleDatesSeparator: '-',
     language: "en",
      clearButton: true,
      todayButton: true,
      classes: 'abs',

     onSelect: function (fd, d, picker) { 
       $("#start").val(fd.split("-")[0]);
       $("#end").val(fd.split("-")[1]);
     },
      onHide: function() {
         console.log(this);
     }
   }).data('datepicker');

   $('#end').on('click', () => {
      picker.show();
   });
});