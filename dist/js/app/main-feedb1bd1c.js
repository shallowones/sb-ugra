"use strict";!function(u,h,m){u(function(){var i="active",l="go",r="up",e=(u(document),u("html")),t=u(".page");new h(".js-main-slider",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"},effect:"fade",speed:500,autoplay:{delay:5e3},on:{init:function(){var e=this.realIndex;this.$timers=this.$el.find(".js-timer");var t=u(this.slides[e]);u(this.$timers[e]).addClass(l),t.addClass(r)},slideChangeTransitionStart:function(){var e=this.$timers,t=this.previousIndex,s=u(this.slides[t]);u(e[t]).addClass("end"),s.removeClass(r)},slideChangeTransitionEnd:function(){var e=this.$timers,t=this.realIndex,s=this.previousIndex,i=u(this.slides[t]),n=u(e[t]),a=u(this.slides[s]);u(e[s]).removeClass("go end"),n.addClass(l),a.removeClass(r),i.addClass(r)}}}),new h(".js-slider",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"}}),new h(".js-slider-big",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"},on:{init:function(){this.$currentSlideNumber=this.$el.find(".js-slide-current")},slideChange:function(){this.$currentSlideNumber.text(this.realIndex+1)}}});var n=u(".js-tab"),a=u(".soc-hidden");n.on("click",function(e){var t=u(e.target),s=u(t.data("target"));n.removeClass(i),a.hide(),s.show(),t.addClass(i)}),u.widget("app.selectmenu",u.ui.selectmenu,{_drawButton:function(){this._super();var e=this.element.find("[selected]").length,t=this.options.placeholder;!e&&t&&this.buttonItem.text(t)}});var s=u(".js-select");s.each(function(e,t){var s=u(t);s.selectmenu({placeholder:s.data("placeholder"),disabled:!0})}),s.length&&t.on("scroll",function(){s.selectmenu("close")}),u.datepicker.regional.ru={closeText:"Закрыть",monthNames:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],monthNamesShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],dayNamesShort:["пн","вт","ср","чт","пт","сб","вс"],dayNamesMin:["пн","вт","ср","чт","пт","сб","вс"],dateFormat:"dd/mm/yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},u.datepicker.setDefaults(u.datepicker.regional.ru);var o=u(".js-calendar");o.length&&o.datepicker({disabled:!0}),new m("Tooltip",{attach:".js-info",onOpen:function(){this.setContent(this.source.html())}}),u(".js-accordion").on("click",function(e){var t=u(e.currentTarget).parent(),s=t.hasClass(i);t.toggleClass(i,!s).find(".accordion-hidden").slideToggle(s)}),u(".js-mobile").on("click",function(){e.toggleClass("mobile-open")});var d=u(".mobile .menu > ul > li > button"),c=u(".mobile .menu-section > .menu-hidden");d.on("click",function(e){e.preventDefault();var t=u(e.currentTarget),s=u(t.data("target"));d.removeClass(i),t.addClass(i),c.removeClass(i),s.addClass(i)})})}(jQuery,Swiper,jBox,ScrollMagic,TweenMax,TimelineLite);