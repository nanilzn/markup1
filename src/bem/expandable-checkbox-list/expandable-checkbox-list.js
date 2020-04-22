import $ from 'jquery';

class ExpandableCheckboxList
{
   constructor($component)
   {
      this.$component = $component;
      this.visible = $('.expandable-checkbox-list__rows_collapsed', this.$component).length < 1;
      this.header = $('.expandable-checkbox-list__header', this.$component);
      this.header.on('click', this.onClick.bind(this));
   }

   onClick()
   {
      if(this.visible) {
         $('.expandable-checkbox-list__rows', this.$component).addClass('expandable-checkbox-list__rows_collapsed');
         $('.expandable-checkbox-list__arrow', this.$component).attr('src', require('./expandable-checkbox-list__arrow-down.svg').default);
      }
      else {
         $('.expandable-checkbox-list__rows', this.$component).removeClass('expandable-checkbox-list__rows_collapsed');
         $('.expandable-checkbox-list__arrow', this.$component).attr('src', require('./expandable-checkbox-list__arrow-up.svg').default);
      }

      this.visible = !this.visible;
   }
}

$(() => {
   $('.expandable-checkbox-list').map((index, node) => {
      return new ExpandableCheckboxList(node);
   })
})