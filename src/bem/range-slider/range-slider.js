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
      this.minimumValue = 1000;
      this.maximumValue = 15000;

      // slider accepts 4000, 4100, 4200 values;
      // declines 4001, 4256 and so on. I hope you get it
      this.stepValue = 100;

      // in percents
      this.dragMinX = 0;
      this.dragMaxX = 0;
      this.minimumDistanceBetweenSliderControls = 8;
      
      // I guess it would save some milliseconds
      this.startControl = $('.range-slider__start', this.$component);
      this.endControl = $('.range-slider__end', this.$component);
      this.filledLine = $('.range-slider__filled-line', this.$component);
      this.description = $('.range-slider__description', this.$component);

      // mouse events
      this.$component.on('mousedown', this.onMouseDown.bind(this));
      $(document).on('mousemove', this.onMouseMove.bind(this));
      $(document).on('mouseup', this.onMouseUp.bind(this));
   }

   onMouseDown(ev) {

         // in pixels
         let eventX = ev.pageX - this.$component.offset().left;
         let startX = parseFloat(this.startControl.css('left'))
         let endX   = parseFloat(this.endControl.css('left'))

         if(Math.abs(startX - eventX) > Math.abs(endX - eventX)) {
            this.dragMinX = startX / this.$component.width() * 100 + this.minimumDistanceBetweenSliderControls;
            this.dragMaxX = 100;
            this.dragComponent = this.endControl;
            this.dragType = 'end';
         }
         else {
            this.dragMinX = 0;
            this.dragMaxX = endX / this.$component.width() * 100 - this.minimumDistanceBetweenSliderControls;
            this.dragComponent = this.startControl;
            this.dragType = 'start';
         }
   }

   onMouseMove(ev) {
      if(this.dragComponent != null) {

         // in pixels
         let relX = event.pageX - this.$component.offset().left;
         let relY = event.pageY - this.$component.offset().top;

         // in percents
         let val = relX / this.$component.width() * 100;
         if(val < this.dragMinX)
            val = this.dragMinX;
         else if(val > this.dragMaxX)
            val = this.dragMaxX;

         if(this.dragType == 'start') {
            this.firstControlValue = val;

            let width = (this.dragMaxX - val + this.minimumDistanceBetweenSliderControls);
            this.filledLine.css('margin-left', `calc(${val}%)`);
            this.filledLine.css('width', `calc(${width}%)`);
         } else { // this.dragType == 'end'
            this.secondControlValue = val;

            let width = (val - this.dragMinX + this.minimumDistanceBetweenSliderControls);
            this.filledLine.css('width', `calc(${width}%)`);
         }

         this.dragComponent.css('left', `calc(${val}%)`);

         // update values

         const range = this.maximumValue - this.minimumValue;
         const minimumDescriptionValue = Math.round((range / 100 * this.firstControlValue + this.minimumValue) / this.stepValue) * this.stepValue;
         const maximumDescriptionValue = Math.round((range / 100 * this.secondControlValue + this.minimumValue) / this.stepValue) * this.stepValue;
         this.description.html(`${(minimumDescriptionValue).toFixed()}₽ - ${(maximumDescriptionValue).toFixed()}₽`);
      }
   }

   onMouseUp(ev) {
      this.dragComponent = null;
   }
}

$(() => {
   $('.range-slider__wrapper').map((index, node) => {
      return new RangeSlider($(node));
   });
});