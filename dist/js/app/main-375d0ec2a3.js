"use strict";!function(M,P,B,D,O){M(function(){var a="active",o="show",t="mobile-open",r="invalid",n=M("html"),e=M(document),s=M(O),i=M(".page"),l=function(e){return void 0!==e&&e.length};new P(".js-slider",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"}}),new P(".js-slider-big",{slidesPerView:"auto",navigation:{nextEl:".js-next",prevEl:".js-prev"},on:{init:function(){this.$currentSlideNumber=this.$el.find(".js-slide-current")},slideChange:function(){this.$currentSlideNumber.text(this.realIndex+1)}}});var c=M(".js-tab"),d=M(".soc-hidden");c.on("click",function(e){var t=M(e.target),n=M(t.data("target"));c.removeClass(a),d.hide(),n.show(),t.addClass(a)}),M.widget("app.selectmenu",M.ui.selectmenu,{_drawButton:function(){this._super();var e=this.element.find("[selected]").length,t=this.options.placeholder;!e&&t&&this.buttonItem.text(t)}});var u=M(".js-select");u.each(function(e,t){var n=M(t);n.selectmenu({placeholder:n.data("placeholder")})}),u.length&&i.on("scroll",function(){u.selectmenu("close")}),M.datepicker.regional.ru={closeText:"Закрыть",monthNames:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],monthNamesShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],dayNamesShort:["пн","вт","ср","чт","пт","сб","вс"],dayNamesMin:["пн","вт","ср","чт","пт","сб","вс"],dateFormat:"dd/mm/yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},M.datepicker.setDefaults(M.datepicker.regional.ru);var h=M(".js-calendar");h.length&&h.datepicker({}),new B("Tooltip",{attach:".js-info",onOpen:function(){this.setContent(this.source.html())}}),M(".js-accordion").on("click",function(e){var t=M(e.currentTarget).parent(),n=t.hasClass(a);t.toggleClass(a,!n).find(".accordion-hidden").slideToggle(n)}),M(".js-mobile").on("click",function(){n.toggleClass(t)});var f=M(".mobile .menu > ul > li > button"),m=M(".mobile .menu-section > .menu-hidden");f.on("click",function(e){e.preventDefault();var t=M(e.currentTarget),n=M(t.data("target"));f.removeClass(a),t.addClass(a),m.removeClass(a),n.addClass(a)}),s.resize(function(e){1024<e.currentTarget.innerWidth&&n.removeClass(t)}),M(".js-scrollbar").each(function(e,t){new D(t,{autoHide:!1})});var v=".js-file",p=function(e){var t=e.find(v);l(t)&&t.jfilestyle({text:"Выбрать...",placeholder:"Файл не выбран",dragdrop:!1})};p(e);var g=function(e){var t=e.find("input"),n=e.find("textarea"),s=function(e){var t=M(e.currentTarget).parent();t.removeClass(r),t.parent().removeClass(r)};t.on("focus change",s),n.on("focus change",s)};g(e);var C=new B("Modal",{attach:".js-popup",onOpen:function(){var e=this.source,t=M(e.data("target")),n=t.find(v);l(n)&&n.jfilestyle("destroy");var s=t.html();t.html(""),this.setContent(s),p(this.content),g(this.content);var a=O.grecaptcha,o=this.content.find(".g-recaptcha");l(o)&&void 0!==a&&a.hasOwnProperty("render")&&(o.html(""),a.render(o[0]))},onCloseComplete:function(){var e=this.source,t=M(e.data("target")),n=this.content.find(v);l(n)&&n.jfilestyle("destroy"),this.content.find(".ok").removeClass("ok");var s=this.content.html();this.setContent(""),t.html(s)}});e.on("closeModal",C.close.bind(C));var j=M(".js-menu"),w=M(".js-menu > ul > li > a, .js-menu > ul > li > button"),y=M(".js-menu-section");w.on("mouseover",function(e){var t=M(e.currentTarget);w.removeClass(a),t.addClass(a),y.html(t.parent().find(".menu-hidden").html()),y.addClass("show"),y.stop().animate({opacity:1},300)}),e.on("mouseover",function(e){var t=M(e.target),n=j.find(t);n.length&&n.parent().find(".menu-hidden").length||y.find(t).length||y.stop().animate({opacity:0},300,function(){w.removeClass(a),y.removeClass("show"),y.html("")})}),M(".js-search").on("click",function(e){var t=M(e.target),n=t.hasClass(a);t.parent().toggleClass(a),n||t.parent().find("input").focus()});var b="header-wrap--fixed-scroll-top",x="header-wrap--fixed-scroll-bottom",T=M(".js-float"),k=M(".header"),S=k.offset().top,N=0;i.scroll(function(e){var t=k.offset().top,n=e.currentTarget.scrollTop;t+S<n?n<N?200+t<N-n&&(T.removeClass(x),T.addClass(b),N=n):(T.hasClass(b)&&(T.removeClass(b),T.addClass(x)),N=n):T.removeClass(b+" "+x)});var E=M(".history > section[hidden]");new P(".js-history",{slidesPerView:"auto",on:{init:function(){var n=this,s=this.slides;s.each(function(e,t){M(t).hasClass(a)&&n.slideTo(e)}),s.on("click",function(e){var t=M(e.currentTarget),n=M(t.data("target"));s.removeClass(a),E.removeClass(o),t.addClass(a),n.addClass(o)})}}})})}(jQuery,Swiper,jBox,SimpleBar,window);