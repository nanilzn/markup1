import $ from 'jquery';

class Dropdown
{
   constructor($component) {
      this.$component = $component;
      this.minimumValue = 0;
      this.maximumValue = 10;

      this.declOfNum = this.declOfNum.bind(this);
      this.setupMainValue = this.setupMainValue.bind(this);
      this.onClickClear = this.onClickClear.bind(this);

      $('.dropdown__select', $component).on('click', this.onClickDropdown.bind(this));
      $('.dropdown__plus', $component).on('click', this.onClickPlus.bind(this));
      $('.dropdown__minus', $component).on('click', this.onClickMinus.bind(this));
      $('.dropdown__clear', $component).on('click', this.onClickClear.bind(this));
      
      this.setupMainValue();
   }

   declOfNum(number, titles) {  
      let cases = [2, 0, 1, 1, 1, 2];  
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
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

      this.setupMainValue();
   }

   onClickMinus(ev) {
      let valueNode = $(ev.currentTarget).siblings('.dropdown__counter-value');
      let value = parseInt(valueNode.html());
      
      if(value > this.minimumValue)
         valueNode.html(value - 1);

      if(value == 1) {
         $(ev.currentTarget).addClass('dropdown__counter-button_disabled');
      }

      this.setupMainValue();
   }

   setupMainValue() {

      if($('.dropdown_rooms', this.$component).length > 0) {
         let selectValue = '';
         
         $('.dropdown__counter-value', this.$component).each((index, node) => {
            let value = parseInt($(node).html());
            let name = $(node).parent().siblings('.dropdown__list-item-text').html();
            if(value != 0) {
               if(selectValue.length > 0)
                  selectValue += ', ';

               switch(name.toLowerCase()) {
                  default:
                     break;
                  case 'спальни':
                     name = this.declOfNum(value, ['спальня', 'спальни', 'спален']);
                     break;
                  case 'кровати':
                     name = this.declOfNum(value, ['кровать', 'кровати', 'кроватей']);
                     break;
                  case 'ванные комнаты':
                     name = this.declOfNum(value, ['ванная комната', 'ванные комнаты', 'ванных комнат']);
                     break;
               }

               selectValue += (value + ' ' + name);
            }
         })
         $('.dropdown__select-value', this.$component).html(selectValue);
      }
      else if($('.dropdown_guests', this.$component).length > 0) {

         let sum = 0;
         $('.dropdown__counter-value', this.$component).each((index, node) => {
            sum += parseInt($(node).html());
         })

         if(sum == 0)
            $('.dropdown__select-value', this.$component).html('Сколько гостей');
         else
            $('.dropdown__select-value', this.$component).html(sum + ' ' + this.declOfNum(sum, ['гость', 'гостя', 'гостей']));
      }
      else {
         let sum = 0;
         $('.dropdown__counter-value', this.$component).each((index, node) => {
            sum += parseInt($(node).html());
         })
         $('.dropdown__select-value', this.$component).html(sum);
      }
   }

   onClickClear() {
      $('.dropdown__minus', this.$component).addClass('dropdown__counter-button_disabled');
      $('.dropdown__counter-value', this.$component).html('0');
      this.setupMainValue();
   }
}

$(() => {
   $('.dropdown').map((index, node) => {
      return new Dropdown(node);
   });
})