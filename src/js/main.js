(function ($, Swiper, jBox, SimpleBar, window) {
  $(function () {

    const ACTIVE_CLASS = 'active'

    const SHOW_CLASS = 'show'

    const MOBILE_OPEN_CLASS = 'mobile-open'

    const INVALID_CLASS = 'invalid'

    const OK_CLASS = 'ok'

    const PLAN_WIDTH = 1024

    const $html = $('html')

    const $document = $(document)

    const $window = $(window)

    const $page = $('.page')

    const is = (el) => { return typeof el !== 'undefined' && el.length }

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
      /*if ($select.length) {
        // то по скроллу страницы закрываем попап
        $page.on('scroll', () => {
          $select.selectmenu('close')
        })
      }*/
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
        new SimpleBar(el, {autoHide: false})
      })
    }

    // popup + file custom + error input focus
    {
      const FILE = '.js-file'

      const fileCustom = ($el) => {
        const $file = $el.find(FILE)

        if (is($file)) {
          $file.jfilestyle({
            text: 'Выбрать...',
            placeholder: 'Файл не выбран',
            dragdrop: false
          })
        }
      }
      fileCustom($document)

      const onErrorInputFocus = ($el) => {
        const $input = $el.find('input')
        const $area = $el.find('textarea')
        const f = (e) => {
          const $this = $(e.currentTarget)
          const $parent = $this.parent()
          $parent.removeClass(INVALID_CLASS)
          $parent.parent().removeClass(INVALID_CLASS)
        }

        $input.on('focus change', f)
        $area.on('focus change', f)
      }
      onErrorInputFocus($document)

      const modal = new jBox('Modal', {
        attach: '.js-popup',
        onOpen: function () {
          const $source = this.source
          const $target = $($source.data('target'))
          const $file = $target.find(FILE)
          is($file) && $file.jfilestyle('destroy')
          const html = $target.html()
          $target.html('')
          this.setContent(html)
          fileCustom(this.content)
          onErrorInputFocus(this.content)

          // rerender captcha
          const gCaptcha = window.grecaptcha
          const $captcha = this.content.find('.g-recaptcha')
          if (is($captcha) && typeof gCaptcha !== 'undefined' && gCaptcha.hasOwnProperty('render')) {
            $captcha.html('')
            gCaptcha.render($captcha[0])
          }
        },
        onCloseComplete: function () {
          const $source = this.source
          const $target = $($source.data('target'))
          const $file = this.content.find(FILE)
          is($file) && $file.jfilestyle('destroy')
          this.content.find('.' + OK_CLASS).removeClass(OK_CLASS)
          const html = this.content.html()
          this.setContent('')
          $target.html(html)
        }
      })

      // событие закрытие попапа
      $document.on('closeModal', modal.close.bind(modal))
    }

    // menu
    {
      const $menu = $('.js-menu')
      const $menuItems = $('.js-menu > ul > li > a, .js-menu > ul > li > button')
      const $section = $('.js-menu-section')
      $menuItems.on('mouseover', (e) => {
        const $this = $(e.currentTarget)
        $menuItems.removeClass(ACTIVE_CLASS)
        $this.addClass(ACTIVE_CLASS)
        $section.html($this.parent().find('.menu-hidden').html())
        $section.addClass('show')
        $section.stop().animate(
          {opacity: 1},
          300
        )
      })

      $document.on('mouseover', (e) => {
        const $target = $(e.target)
        const $menuFind = $menu.find($target)
        if ((!$menuFind.length || !$menuFind.parent().find('.menu-hidden').length)
          && !$section.find($target).length) {
          $section.stop().animate(
            {opacity: 0},
            300,
            () => {
              $menuItems.removeClass(ACTIVE_CLASS)
              $section.removeClass('show')
              $section.html('')
            }
          )
        }
      })
    }

    // search
    {
      $('.js-search').on('click', (e) => {
        const $this = $(e.target)
        const isActive = $this.hasClass(ACTIVE_CLASS)
        $this.parent().toggleClass(ACTIVE_CLASS)
        if (!isActive) {
          $this.parent().find('input').focus()
        }
      })
    }

    // floating menu
    {
      const SCROLL_TOP = 'header-wrap--fixed-scroll-top'
      const SCROLL_BOTTOM = 'header-wrap--fixed-scroll-bottom'
      const DIFF_MORE = 200

      const $float = $('.js-float')
      const $header = $('.header')

      let previousPosition = 0
      $page.scroll((e) => {
        const headerTopPosition = $header.offset().top
        const currentPosition = e.currentTarget.scrollTop
        if (currentPosition > headerTopPosition) {
          if (previousPosition > currentPosition) {
            if (previousPosition - currentPosition > DIFF_MORE + headerTopPosition) {
              $float.removeClass(SCROLL_BOTTOM)
              $float.addClass(SCROLL_TOP)
              previousPosition = currentPosition
            }
          } else {
            if ($float.hasClass(SCROLL_TOP)) {
              $float.removeClass(SCROLL_TOP)
              $float.addClass(SCROLL_BOTTOM)
            }
            previousPosition = currentPosition
          }
        } else {
          $float.removeClass(SCROLL_TOP + ' ' + SCROLL_BOTTOM)
        }
      })
    }

    // history
    {
      const $sections = $('.history > section[hidden]')

      new Swiper('.js-history', {
        slidesPerView: 'auto',
        on: {
          init: function () {
            const $buttons = this.slides

            $buttons.each((index, button) => {
              const $this = $(button)
              if ($this.hasClass(ACTIVE_CLASS)) {
                this.slideTo(index)
              }
            })

            $buttons.on('click', (e) => {
              const $this = $(e.currentTarget)
              const $target = $($this.data('target'))
              $buttons.removeClass(ACTIVE_CLASS)
              $sections.removeClass(SHOW_CLASS)
              $this.addClass(ACTIVE_CLASS)
              $target.addClass(SHOW_CLASS)
            })
          }
        }
      })
    }

  })
})(jQuery, Swiper, jBox, SimpleBar, window)
