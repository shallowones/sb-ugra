(function ($, Swiper, jBox) {
  $(function () {

    const ACTIVE_CLASS = 'active'

    const GO_CLASS = 'go'

    const MOBILE_OPEN_CLASS = 'mobile-open'

    const $document = $(document)

    const $page = $('.page')

    // main slider
    {
      new Swiper('.js-main-slider', {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.js-next',
          prevEl: '.js-prev'
        },
        effect: 'fade',
        autoplay: {
          delay: 5000
        },
        on: {
          init: function () {
            this.$timers = this.$el.find('.js-timer')
            const $currentTimer = $(this.$timers[this.realIndex])
            $currentTimer.addClass(GO_CLASS)
          },

          slideChangeTransitionStart: function () {
            const {$timers, previousIndex} = this
            const $prevTimer = $($timers[previousIndex])
            /*$prevTimer.stop().animate( TODO не работает плавный opacity, чекнуть!
              { opacity: 0 },
              2000,
              () => {
                setTimeout(() => {
                  //$prevTimer.removeClass(GO_CLASS)
                }, 200)
              }
            )*/
            $prevTimer.removeClass(GO_CLASS)
          },

          slideChangeTransitionEnd: function () {
            const {$timers, realIndex} = this
            const $currentTimer = $($timers[realIndex])
            //$timers.removeAttr('style')
            $currentTimer.addClass(GO_CLASS)
          },

          slideChange: function () {
            if (!this.autoplay.running) {
              this.autoplay.start()
              this.autoplay.run()
            }
          }
        }
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
          placeholder: $this.data('placeholder')
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
        $calendar.datepicker()
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
        $page.toggleClass(MOBILE_OPEN_CLASS)
      })

      // menu
      const $menuLi = $('.mobile .menu > ul > li')
      $menuLi.on('click', (e) => {
        e.preventDefault()
        $menuLi.removeClass(ACTIVE_CLASS)
        $(e.currentTarget).addClass(ACTIVE_CLASS)
      })
    }

  })
})(jQuery, Swiper, jBox)
