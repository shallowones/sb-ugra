(function ($, ScrollMagic, TweenMax, window) {

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

          window.exports.mainSlider.init()
        }
      })
    }, false)
  }, false)

})(jQuery, ScrollMagic, TweenMax, window)
