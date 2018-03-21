(function ($, ScrollMagic, TweenMax, TimeLineLite) {
  /**
   * Функция, отвечающая за анимацию на главной странице
   */
  $(function () {

    const animate = (() => {

      return (controller, animationNumber) => {
        const $animation = $('#animation-' + animationNumber)
        const animationTrigger = '#animation-trigger-' + animationNumber

        const fade = TweenMax.staggerTo($animation, 1, {
          opacity: 1,
          transform: 'translateY(0)'
        }, 0)

        new ScrollMagic.Scene({triggerElement: animationTrigger, triggerHook: 0.8})
          .setTween(fade)
          .addTo(controller)
      }
    })()

    const controller = new ScrollMagic.Controller({
      addIndicators: true // плагин подключается только в режиме разработки
    })

    const animationsCount = 1

    for (let i = 0; i < animationsCount; i++) {
      animate(controller, i + 1)
    }

  })
})($, ScrollMagic, TweenMax, TimelineLite)
