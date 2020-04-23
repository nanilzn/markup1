import $ from 'jquery';

class Dropdown
{
   constructor($component) {
      this.$component = $component;
      this.minimumValue = 0;
      this.maximumValue = 10;

      $('.dropdown__select', $component).on('click', this.onClickDropdown.bind(this));
      $('.dropdown__plus', $component).on('click', this.onClickPlus.bind(this));
      $('.dropdown__minus', $component).on('click', this.onClickMinus.bind(this));
      $('.dropdown__clear', $component).on('click', this.onClickClear.bind(this));
   }

   onClickDropdown() {
      let collapsed = $('.dropdown__list_collapsed', this.$component).length > 0;

      if(collapsed) {
         $('.dropdown__list', this.$component).removeClass('dropdown__list_collapsed');
         $('.dropdown__select', this.$component).addClass('dropdown__select_expanded');
      }
      else {
         $('.dropdown__list', this.$component).addClass('dropdown__list_collapsed');
         $('.dropdown__select', this.$component).removeClass('dropdown__select_expanded');
      }
   }

   onClickPlus(ev) {
      let valueNode = $(ev.currentTarget).siblings('.dropdown__counter-value');
      let value = parseInt(valueNode.html());

      if(value < this.maximumValue)
         valueNode.html(value + 1);
      
      if(value == 0)
         $(ev.currentTarget).siblings('.dropdown__minus').removeClass('dropdown__counter-button_disabled');
   }

   onClickMinus(ev) {
      let valueNode = $(ev.currentTarget).siblings('.dropdown__counter-value');
      let value = parseInt(valueNode.html());
      
      if(value > this.minimumValue)
         valueNode.html(value - 1);

      if(value == 1) {
         $(ev.currentTarget).addClass('dropdown__counter-button_disabled');
      }
   }

   onClickClear() {
      $('.dropdown__minus', this.$component).addClass('dropdown__counter-button_disabled');
      $('.dropdown__counter-value', this.$component).html('0');
   }
}

$(() => {
   $('.dropdown').map((index, node) => {
      return new Dropdown(node);
   });
})