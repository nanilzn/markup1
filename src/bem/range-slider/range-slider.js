import $ from 'jquery';

class RangeSlider
{
   constructor($component) {
      this.$component = $component;
      this.dragComponent = null;
      this.dragType = 'none';

      // in percents
      this.firstControlValue = 100 / 3;
      this.secondControlValue = 100 / 3 * 2;
      this.minimumValue = 0;
      this.maximumValue = 15000;

      // in percents
      this.dragMinX = 0;
      this.dragMaxX = 0;
      this.minimumDistanceBetweenSliderControls = 8;
      
      this.$component.on('mousedown', (ev) => {
         let eventX = ev.pageX - this.$component.offset().left;

         // in pixels
         let startX = parseFloat($('.range-slider__start', this.$component).css('left'))
         let endX   = parseFloat($('.range-slider__end', this.$component).css('left'))

         if(Math.abs(startX - eventX) > Math.abs(endX - eventX)) {
            this.dragMinX = startX / this.$component.width() * 100 + this.minimumDistanceBetweenSliderControls;
            this.dragMaxX = 100;
            this.dragComponent = $('.range-slider__end', this.$component);
            this.dragType = 'end';
         }
         else {
            this.dragMinX = 0;
            this.dragMaxX = endX / this.$component.width() * 100 - this.minimumDistanceBetweenSliderControls;
            this.dragComponent = $('.range-slider__start', this.$component);
            this.dragType = 'start';
         }
      });
      
      $(document).on('mousemove', (ev) => {
         if(this.dragComponent != null) {
            let relX = event.pageX - this.$component.offset().left;
            let relY = event.pageY - this.$component.offset().top;

            let val = relX / this.$component.width() * 100;
            if(val < this.dragMinX)
               val = this.dragMinX;
            else if(val > this.dragMaxX)
               val = this.dragMaxX;

            if(this.dragType == 'start') {
               this.firstControlValue = val;

               let width = (this.dragMaxX - val + this.minimumDistanceBetweenSliderControls);
               $('.range-slider__filled-line', this.$component).css('margin-left', `calc(${val}%)`);
               $('.range-slider__filled-line', this.$component).css('width', `calc(${width}%)`);
            } else { // this.dragType == 'end'
               this.secondControlValue = val;

               let width = (val - this.dragMinX + this.minimumDistanceBetweenSliderControls);
               $('.range-slider__filled-line', this.$component).css('width', `calc(${width}%)`);
            }

            this.dragComponent.css('left', `calc(${val}%)`);

            // update values

            let range = this.maximumValue - this.minimumValue;
            $('.range-slider__description', this.$component)
               .html(`${(range / 100 * this.firstControlValue).toFixed()}₽ - ${(range / 100 * this.secondControlValue).toFixed()}₽`);
         }
      });

      $(document).on('mouseup', (ev) => {
         this.dragComponent = null;
      });
   }
}

$(() => {
   $('.range-slider__wrapper').map((index, node) => {
      return new RangeSlider($(node));
   });
});