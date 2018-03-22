(function ($, ScrollMagic, TweenMax, Swiper) {

  const GO_CLASS = 'go'

  const UP_CLASS = 'up'

  const END_CLASS = 'end'

  /**
   * Функция, отвечающая за анимацию на главной странице
   */
  addEventListener('DOMContentLoaded', () => {
    const animate = (() => {

      return (controller, animationNumber, delay) => {
        const $animation = $('#animation-' + animationNumber)
        const animationTrigger = '#animation-trigger-' + animationNumber

        const fade = TweenMax.staggerTo($animation, 1, {
          opacity: 1,
          transform: 'translateY(0)',
          delay
        }, 0)

        new ScrollMagic.Scene({
          triggerElement: animationTrigger,
          triggerHook: 0.8,
          reverse: false
        })
          .setTween(fade)
          .addTo(controller)
      }
    })()

    const controller = new ScrollMagic.Controller({
      addIndicators: true // плагин подключается только в режиме разработки
    })

    const slider = new Swiper('.js-main-slider', {
      init: false,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.js-next',
        prevEl: '.js-prev'
      },
      effect: 'fade',
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      simulateTouch: false,
      breakpoints: {
        480: {
          simulateTouch: true
        }
      },
      on: {
        init: function () {
          const {realIndex} = this
          this.$timers = this.$el.find('.js-timer')
          const $currentSlide = $(this.slides[realIndex])
          const $currentTimer = $(this.$timers[realIndex])
          $currentTimer.addClass(GO_CLASS)
          $currentSlide.addClass(UP_CLASS)
        },
        slideChangeTransitionStart: function () {
          const {$timers, previousIndex} = this
          const $previousSlide = $(this.slides[previousIndex])
          const $prevTimer = $($timers[previousIndex])
          $prevTimer.addClass(END_CLASS)
          $previousSlide.removeClass(UP_CLASS)
        },
        slideChangeTransitionEnd: function () {
          const {$timers, realIndex, previousIndex} = this
          const $currentSlide = $(this.slides[realIndex])
          const $currentTimer = $($timers[realIndex])
          const $previousSlide = $(this.slides[previousIndex])
          const $prevTimer = $($timers[previousIndex])
          $prevTimer.removeClass(GO_CLASS + ' ' + END_CLASS)
          $currentTimer.addClass(GO_CLASS)
          $previousSlide.removeClass(UP_CLASS)
          $currentSlide.addClass(UP_CLASS)
        }
      }
    })

    addEventListener('load', () => {
      const $loader = $('.js-loader')
      TweenMax.to($loader, 0.5, {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          $loader.remove()

          const $animations = $('.animation')
          $animations.each((index, el) => {
            animate(controller, index + 1, parseFloat(el.dataset.delay) || 0)
          })

          slider.init()
        }
      })
    }, false)
  }, false)

})(jQuery, ScrollMagic, TweenMax, Swiper)
