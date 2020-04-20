import $ from 'jquery';

class RateButton
{
   constructor($component) {
      
      this.$component = $component;
      this.starNumber = $component.children().length;

      $component.children().each((index, n) => {
         $(n).data('index', index + 1);
         $(n).data('enabled', true);
         $(n).on('click', this.onClick.bind(this));
      });
   }

   onClick(ev) {

      let index = $(ev.target).data('index');
      let enabled = $(ev.target).data('enabled');

      this.starNumber = index;

      this.$component.children().each((idx, n) => {
         if($(n).data('index') > index) {
            $(n).removeClass('rate-button__enabled');
            $(n).addClass('rate-button__disabled');
         }
         else {
            $(n).removeClass('rate-button__disabled');
            $(n).addClass('rate-button__enabled');
         }
      })

      $(ev.target).data('enabled', !enabled)
   }
};

$(() => {
   $('.rate-button').map((index, node) => {
      return new RateButton($(node));
   });
});