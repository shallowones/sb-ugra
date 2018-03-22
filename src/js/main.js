(function ($, Swiper, jBox, SimpleBar) {
  $(function () {

    const ACTIVE_CLASS = 'active'

    const MOBILE_OPEN_CLASS = 'mobile-open'

    const PLAN_WIDTH = 1024

    const $html = $('html')

    const $window = $(window)

    const $page = $('.page')

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

    // slider big
    {
      new Swiper('.js-slider-big', {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.js-next',
          prevEl: '.js-prev'
        },
        on: {
          init: function () {
            this.$currentSlideNumber = this.$el.find('.js-slide-current')
          },
          slideChange: function () {
            this.$currentSlideNumber.text(this.realIndex + 1)
          }
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

    // select menu
    {
      $.widget('app.selectmenu', $.ui.selectmenu, {
        _drawButton: function () {
          this._super()
          const selected = this.element.find('[selected]').length
          const placeholder = this.options.placeholder

          if (!selected && placeholder) {
            this.buttonItem.text(placeholder)
          }
        }
      })

      const $select = $('.js-select')
      $select.each((index, el) => {
        const $this = $(el)
        $this.selectmenu({
          placeholder: $this.data('placeholder'),
          disabled: true // TODO remove this
        })
      })

      // если ест на странице кастомный селект
      if ($select.length) {
        // то по скроллу страницы закрываем попап
        $page.on('scroll', () => {
          $select.selectmenu('close')
        })
      }
    }

    // calendar TODO возможно придется менять при разработке
    {
      $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август',
          'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ],
        monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        dayNamesShort: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        dayNamesMin: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
      }

      $.datepicker.setDefaults($.datepicker.regional['ru'])

      const $calendar = $('.js-calendar')

      if ($calendar.length) {
        $calendar.datepicker({
          disabled: true // TODO remove this
        })
      }
    }

    // info popup
    {
      new jBox('Tooltip', {
        attach: '.js-info',
        onOpen: function () {
          this.setContent(
            this.source.html()
          )
        }
      })
    }

    // accordion
    {
      $('.js-accordion').on('click', (e) => {
        const $this = $(e.currentTarget)
        const $parent = $this.parent()
        const isActive = $parent.hasClass(ACTIVE_CLASS)
        $parent
          .toggleClass(ACTIVE_CLASS, !isActive)
          .find('.accordion-hidden').slideToggle(isActive)
      })
    }

    // mobile
    {
      // button
      $('.js-mobile').on('click', () => {
        $html.toggleClass(MOBILE_OPEN_CLASS)
      })

      // menu
      const $menuItem = $('.mobile .menu > ul > li > button')
      const $menuSection = $('.mobile .menu-section > .menu-hidden')
        $menuItem.on('click', (e) => {
        e.preventDefault()
        const $this = $(e.currentTarget)
        const $section = $($this.data('target'))
        $menuItem.removeClass(ACTIVE_CLASS)
        $this.addClass(ACTIVE_CLASS)
        $menuSection.removeClass(ACTIVE_CLASS)
        $section.addClass(ACTIVE_CLASS)
      })

      $window.resize((e) => {
        if (e.currentTarget.innerWidth > PLAN_WIDTH) {
          $html.removeClass(MOBILE_OPEN_CLASS)
        }
      })
    }

    // scroll
    {
      $('.js-scrollbar').each((index, el) => {
        new SimpleBar(el, { autoHide: false })
      })
    }

    // popup
    {
      new jBox('Modal', {
        attach: '.js-popup',
        onOpen: function () {
          const $source = this.source
          const $target = $($source.data('target'))
          const html = $target.html()
          $target.html('')
          this.setContent(html)
        },
        onCloseComplete: function () {
          const $source = this.source
          const $target = $($source.data('target'))
          const html = this.content.html()
          this.setContent('')
          $target.html(html)
        }
      })
    }

  })
})(jQuery, Swiper, jBox, SimpleBar)
