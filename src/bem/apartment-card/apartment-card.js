import $ from 'jquery';

class ApartmentCard
{
   constructor($component)
   {
      this.$component = $component;
      this.index = 0;
      this.maxIndex = $('.apartment-card__img', this.$component).length - 1;

      this.rearrangeImages = this.rearrangeImages.bind(this);
      this.onClickLeftArrow = this.onClickLeftArrow.bind(this);
      this.onClickRightArrow = this.onClickRightArrow.bind(this);

      $(window).resize(() => {
         $('.apartment-card__img-track', this.$component).finish();
         this.rearrangeImages();
      });

      this.rearrangeImages();

      let dotNumber = this.maxIndex;
      $('.apartment-card__dot', this.$component).each((index, node) => {
         $(node).css('right', `${(dotNumber - index) * 11.25 + 15}px`);
      });

      $('.apartment-card__image-left-shade', this.$component).on('click', this.onClickLeftArrow);
      $('.apartment-card__image-right-shade', this.$component).on('click', this.onClickRightArrow);
      $('.apartment-card__arrow-left', this.$component).on('click', this.onClickLeftArrow);
      $('.apartment-card__arrow-right', this.$component).on('click', this.onClickRightArrow);
   }

   rearrangeImages()
   {
      let width = $('.apartment-card__wrapper', this.$component).width();
      $('.apartment-card__img', this.$component).each((index, node) => {
         $(node).css('left', `${width * index}px`)
      });
      $('.apartment-card__img-track', this.$component).css('left', `${this.index * -width}px`);
   }

   onClickLeftArrow()
   {
      if(this.index <= 0)
         return;

      let width = $('.apartment-card__wrapper', this.$component).width();
      
      $($('.apartment-card__dot', this.$component)[this.index]).removeClass('apartment-card__dot_full');
      this.index--;
      $($('.apartment-card__dot', this.$component)[this.index]).addClass('apartment-card__dot_full');

      $('.apartment-card__img-track', this.$component).animate({
         left: `${this.index * -width}px`
      });
   }

   onClickRightArrow()
   {
      if(this.index >= this.maxIndex)
         return;

      let width = $('.apartment-card__wrapper', this.$component).width();
      
      $($('.apartment-card__dot', this.$component)[this.index]).removeClass('apartment-card__dot_full');
      this.index++;
      $($('.apartment-card__dot', this.$component)[this.index]).addClass('apartment-card__dot_full');

      $('.apartment-card__img-track', this.$component).animate({
         left: `${this.index * -width}px`
      });
   }
}

$(() => {
   $('.apartment-card').map((index, node) => {
      return new ApartmentCard(node);
   })
});