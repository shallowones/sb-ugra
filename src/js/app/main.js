(function ($, Swiper) {
  $(function () {

    const ACTIVE_CLASS = 'active'

    const $document = $(document)

    // main slider
    {
      new Swiper('.js-main-slider', {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.main-slider__next',
          prevEl: '.main-slider__prev'
        },
        effect: 'fade',
      })
    }

    // slider
    {
      new Swiper('.js-slider', {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.js-next',
          prevEl: '.js-prev'
        }
      })
    }

    // social tabs
    {
      const $tabs = $('.js-tab')
      const $hidden = $('.soc-hidden')
      $tabs.on('click', (e) => {
        const $this = $(e.target)
        const $target = $($this.data('target'))
        $tabs.removeClass(ACTIVE_CLASS)
        $hidden.hide()
        $target.show()
        $this.addClass(ACTIVE_CLASS)
      })
    }

    // main menu TODO оставил для клика на планшетах и мобилках!
    {
      /*const $menu = $('.js-menu')
      const $hiddenBlocks = $('.menu-hidden')
      const $menuLi = $menu.find('ul > li')
      const $menuLinks = $menu.find('ul > li > a')
      $document.on('mouseover', (e) => {
        const $this = $(e.target)
        let isMenuLinks = false
        $menuLinks.each((index, link) => {
          if (link === e.target) {
            isMenuLinks = true
            return false
          }
        })
        if (isMenuLinks) {
          $menuLi.removeClass(ACTIVE_CLASS)
          $this.parent().addClass(ACTIVE_CLASS)
        } else {
          let mouseOverHiddenBlock = false
          $hiddenBlocks.each((index, hidden) => {
            const $hidden = $(hidden)
            if ($hidden === $this || $hidden.find($this).length) {
              mouseOverHiddenBlock = true
              return false
            }
          })
          if (!mouseOverHiddenBlock) {
            $menuLi.removeClass(ACTIVE_CLASS)
          }
        }
      })*/
    }

  })
})(jQuery, Swiper)
