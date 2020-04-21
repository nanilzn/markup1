import $ from 'jquery';

class LikeButton
{
   constructor($component) {
      this.$component = $component;
      this.$component.on('click', this.onClick.bind(this));
   }

   isActive() {
      return this.$component.attr('class').split(/\s+/).includes('like-button_active');
   }

   onClick() {
      let currentValue = Number($('.like-button__value', this.$component).html());

      if(this.isActive()) {
         this.$component.removeClass('like-button_active');
         this.$component.addClass('like-button_inactive');
         $('.like-button__value', this.$component).html(currentValue - 1);
      }
      else { // inactive
         this.$component.removeClass('like-button_inactive');
         this.$component.addClass('like-button_active');
         $('.like-button__value', this.$component).html(currentValue  + 1);
      }
   }
}

$(() => {
   $('.like-button').map((index, node) => {
      return new LikeButton($(node));
   })
});