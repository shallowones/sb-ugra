"use strict";!function(r,o,d,e){var l="go",c="up";addEventListener("DOMContentLoaded",function(){var t=function(e,i,t){var s=r("#animation-"+i),a="#animation-trigger-"+i,n=d.staggerTo(s,1,{opacity:1,transform:"translateY(0)",delay:t},0);new o.Scene({triggerElement:a,triggerHook:.8,reverse:!1}).setTween(n).addTo(e)},s=new o.Controller({addIndicators:!0}),i=new e(".js-main-slider",{init:!1,slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"},effect:"fade",speed:500,autoplay:{delay:5e3,disableOnInteraction:!1},simulateTouch:!1,breakpoints:{480:{simulateTouch:!0}},on:{init:function(){var e=this.realIndex;this.$timers=this.$el.find(".js-timer");var i=r(this.slides[e]);r(this.$timers[e]).addClass(l),i.addClass(c)},slideChangeTransitionStart:function(){var e=this.$timers,i=this.previousIndex,t=r(this.slides[i]);r(e[i]).addClass("end"),t.removeClass(c)},slideChangeTransitionEnd:function(){var e=this.$timers,i=this.realIndex,t=this.previousIndex,s=r(this.slides[i]),a=r(e[i]),n=r(this.slides[t]);r(e[t]).removeClass("go end"),a.addClass(l),n.removeClass(c),s.addClass(c)}}});addEventListener("load",function(){var e=r(".js-loader");d.to(e,.5,{opacity:0,delay:1,onComplete:function(){e.remove(),r(".animation").each(function(e,i){t(s,e+1,parseFloat(i.dataset.delay)||0)}),i.init()}})},!1)},!1)}(jQuery,ScrollMagic,TweenMax,Swiper);