"use strict";!function(N,E,B,D){N(function(){var s="active",a="show",t="mobile-open",n="invalid",o=N("html"),e=N(document),r=N(window),i=N(".page");new E(".js-slider",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"}}),new E(".js-slider-big",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"},on:{init:function(){this.$currentSlideNumber=this.$el.find(".js-slide-current")},slideChange:function(){this.$currentSlideNumber.text(this.realIndex+1)}}});var l=N(".js-tab"),c=N(".soc-hidden");l.on("click",function(e){var t=N(e.target),n=N(t.data("target"));l.removeClass(s),c.hide(),n.show(),t.addClass(s)}),N.widget("app.selectmenu",N.ui.selectmenu,{_drawButton:function(){this._super();var e=this.element.find("[selected]").length,t=this.options.placeholder;!e&&t&&this.buttonItem.text(t)}});var d=N(".js-select");d.each(function(e,t){var n=N(t);n.selectmenu({placeholder:n.data("placeholder"),disabled:!0})}),d.length&&i.on("scroll",function(){d.selectmenu("close")}),N.datepicker.regional.ru={closeText:"Закрыть",monthNames:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],monthNamesShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],dayNamesShort:["пн","вт","ср","чт","пт","сб","вс"],dayNamesMin:["пн","вт","ср","чт","пт","сб","вс"],dateFormat:"dd/mm/yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},N.datepicker.setDefaults(N.datepicker.regional.ru);var u=N(".js-calendar");u.length&&u.datepicker({disabled:!0}),new B("Tooltip",{attach:".js-info",onOpen:function(){this.setContent(this.source.html())}}),N(".js-accordion").on("click",function(e){var t=N(e.currentTarget).parent(),n=t.hasClass(s);t.toggleClass(s,!n).find(".accordion-hidden").slideToggle(n)}),N(".js-mobile").on("click",function(){o.toggleClass(t)});var h=N(".mobile .menu > ul > li > button"),m=N(".mobile .menu-section > .menu-hidden");h.on("click",function(e){e.preventDefault();var t=N(e.currentTarget),n=N(t.data("target"));h.removeClass(s),t.addClass(s),m.removeClass(s),n.addClass(s)}),r.resize(function(e){1024<e.currentTarget.innerWidth&&o.removeClass(t)}),N(".js-scrollbar").each(function(e,t){new D(t,{autoHide:!1})});var f=".js-file",v=function(e){e.find(f).jfilestyle({text:"Выбрать...",placeholder:"Файл не выбран",dragdrop:!1,onChange:function(e){e}})};v(e);var p=function(e){e.find("input").on("focus change",function(e){var t=N(e.currentTarget).parent();t.removeClass(n),t.parent().removeClass(n)})};p(e),new B("Modal",{attach:".js-popup",onOpen:function(){var e=this.source,t=N(e.data("target"));t.find(f).jfilestyle("destroy");var n=t.html();t.html(""),this.setContent(n),v(this.content),p(this.content)},onCloseComplete:function(){var e=this.source,t=N(e.data("target"));this.content.find(f).jfilestyle("destroy");var n=this.content.html();this.setContent(""),t.html(n)}});var g=N(".js-menu"),C=N(".js-menu > ul > li > a, .js-menu > ul > li > button"),j=N(".js-menu-section");C.on("mouseover",function(e){var t=N(e.currentTarget);C.removeClass(s),t.addClass(s),j.html(t.parent().find(".menu-hidden").html()),j.addClass("show"),j.stop().animate({opacity:1},300)}),e.on("mouseover",function(e){var t=N(e.target),n=g.find(t);n.length&&n.parent().find(".menu-hidden").length||j.find(t).length||j.stop().animate({opacity:0},300,function(){C.removeClass(s),j.removeClass("show"),j.html("")})}),N(".js-search").on("click",function(e){var t=N(e.target),n=t.hasClass(s);t.parent().toggleClass(s),n||t.parent().find("input").focus()});var w="header-wrap--fixed-scroll-top",y="header-wrap--fixed-scroll-bottom",b=N(".js-float"),x=N(".header"),T=0;i.scroll(function(e){var t=x.offset().top,n=e.currentTarget.scrollTop;t<n?n<T?200+t<T-n&&(b.removeClass(y),b.addClass(w),T=n):(b.hasClass(w)&&(b.removeClass(w),b.addClass(y)),T=n):b.removeClass(w+" "+y)});var k=N(".js-history"),S=N(".history > section[hidden]");k.on("click",function(e){var t=N(e.currentTarget),n=N(t.data("target"));k.removeClass(s),S.removeClass(a),t.addClass(s),n.addClass(a)})})}(jQuery,Swiper,jBox,SimpleBar);