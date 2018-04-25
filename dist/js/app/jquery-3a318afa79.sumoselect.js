"use strict";!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(a){"namespace sumo";a.fn.SumoSelect=function(e){var n=a.extend({placeholder:"Select Here",csvDispCount:3,captionFormat:"{0} Selected",captionFormatAllSelected:"{0} all selected!",floatWidth:400,forceCustomRendering:!1,nativeOnDevice:["Android","BlackBerry","iPhone","iPad","iPod","Opera Mini","IEMobile","Silk"],outputAsCSV:!1,csvSepChar:",",okCancelInMulti:!1,triggerChangeCombined:!0,selectAll:!1,search:!1,searchText:"Search...",noMatch:'No matches for "{0}"',prefix:"",locale:["OK","Cancel","Select All"],up:!1,showTitle:!0},e),t=this.each(function(){var s=this;!this.sumo&&a(this).is("select")&&(this.sumo={E:a(s),is_multi:a(s).attr("multiple"),select:"",caption:"",placeholder:"",optDiv:"",CaptionCont:"",ul:"",is_floating:!1,is_opened:!1,mob:!1,Pstate:[],createElems:function(){var e=this;e.E.wrap('<div class="SumoSelect" tabindex="0" role="button" aria-expanded="false">'),e.select=e.E.parent(),e.caption=a("<span>"),e.CaptionCont=a('<p class="CaptionCont SelectBox" ><label><i></i></label></p>').attr("style",e.E.attr("style")).prepend(e.caption),e.select.append(e.CaptionCont),e.is_multi||(n.okCancelInMulti=!1),e.E.attr("disabled")&&e.select.addClass("disabled").removeAttr("tabindex"),n.outputAsCSV&&e.is_multi&&e.E.attr("name")&&(e.select.append(a('<input class="HEMANT123" type="hidden" />').attr("name",e.E.attr("name")).val(e.getSelStr())),e.E.removeAttr("name")),!e.isMobile()||n.forceCustomRendering?(e.E.attr("name")&&e.select.addClass("sumo_"+e.E.attr("name").replace(/\[\]/,"")),e.E.addClass("SumoUnder").attr("tabindex","-1"),e.optDiv=a('<div class="optWrapper '+(n.up?"up":"")+'">'),e.floatingList(),e.ul=a('<ul class="options">'),e.optDiv.append(e.ul),n.selectAll&&e.is_multi&&e.SelAll(),n.search&&e.Search(),e.ul.append(e.prepItems(e.E.children())),e.is_multi&&e.multiSelelect(),e.select.append(e.optDiv),e.basicEvents(),e.selAllState()):e.setNativeMobile()},prepItems:function(e,l){var i=[],s=this;return a(e).each(function(e,t){t=a(t),i.push(t.is("optgroup")?a('<li class="group '+(t[0].disabled?"disabled":"")+'"><label>'+t.attr("label")+"</label><ul></ul></li>").find("ul").append(s.prepItems(t.children(),t[0].disabled)).end():s.createLi(t,l))}),i},createLi:function(e,t){e.attr("value")||e.attr("value",e.val());var l=a('<li class="opt"><label>'+e.text()+"</label></li>");return l.data("opt",e),e.data("li",l),this.is_multi&&l.prepend("<span><i></i></span>"),(e[0].disabled||t)&&(l=l.addClass("disabled")),this.onOptClick(l),e[0].selected&&l.addClass("selected"),e.attr("class")&&l.addClass(e.attr("class")),e.attr("title")&&l.attr("title",e.attr("title")),l},getSelStr:function(){return sopt=[],this.E.find("option:selected").each(function(){sopt.push(a(this).val())}),sopt.join(n.csvSepChar)},multiSelelect:function(){var l=this;l.optDiv.addClass("multiple"),l.okbtn=a('<p tabindex="0" class="btnOk">'+n.locale[0]+"</p>").click(function(){n.triggerChangeCombined&&(changed=!1,l.E.find("option:selected").length!=l.Pstate.length?changed=!0:l.E.find("option").each(function(e,t){t.selected&&l.Pstate.indexOf(e)<0&&(changed=!0)}),changed&&(l.callChange(),l.setText())),l.hideOpts()}),l.cancelBtn=a('<p tabindex="0" class="btnCancel">'+n.locale[1]+"</p>").click(function(){l._cnbtn(),l.hideOpts()});var e=l.okbtn.add(l.cancelBtn);l.optDiv.append(a('<div class="MultiControls">').append(e)),e.on("keydown.sumo",function(e){var t=a(this);switch(e.which){case 32:case 13:t.trigger("click");break;case 9:if(t.hasClass("btnOk"))return;case 27:return l._cnbtn(),void l.hideOpts()}e.stopPropagation(),e.preventDefault()})},_cnbtn:function(){var e=this;e.E.find("option:selected").each(function(){this.selected=!1}),e.optDiv.find("li.selected").removeClass("selected");for(var t=0;t<e.Pstate.length;t++)e.E.find("option")[e.Pstate[t]].selected=!0,e.ul.find("li.opt").eq(e.Pstate[t]).addClass("selected");e.selAllState()},SelAll:function(){var e=this;e.is_multi&&(e.selAll=a('<p class="select-all"><span><i></i></span><label>'+n.locale[2]+"</label></p>"),e.optDiv.addClass("selall"),e.selAll.on("click",function(){e.selAll.toggleClass("selected"),e.toggSelAll(e.selAll.hasClass("selected"),1)}),e.optDiv.prepend(e.selAll))},Search:function(){var l=this,e=l.CaptionCont.addClass("search"),t=a('<p class="no-match">');l.ftxt=a('<input type="text" class="search-txt" value="" placeholder="'+n.searchText+'">').on("click",function(e){e.stopPropagation()}),e.append(l.ftxt),l.optDiv.children("ul").after(t),l.ftxt.on("keyup.sumo",function(){var e=l.optDiv.find("ul.options li.opt").each(function(e,t){-1<(t=a(t)).text().toLowerCase().indexOf(l.ftxt.val().toLowerCase())?t.removeClass("hidden"):t.addClass("hidden")}).not(".hidden");t.html(n.noMatch.replace(/\{0\}/g,"<em></em>")).toggle(!e.length),t.find("em").text(l.ftxt.val()),l.selAllState()})},selAllState:function(){var e=this;if(n.selectAll&&e.is_multi){var l=0,i=0;e.optDiv.find("li.opt").not(".hidden").each(function(e,t){a(t).hasClass("selected")&&l++,a(t).hasClass("disabled")||i++}),l==i?e.selAll.removeClass("partial").addClass("selected"):0==l?e.selAll.removeClass("selected partial"):e.selAll.addClass("partial")}},showOpts:function(){var t=this;t.E.attr("disabled")||(t.E.trigger("sumo:opening",t),t.is_opened=!0,t.select.addClass("open").attr("aria-expanded","true"),t.E.trigger("sumo:opened",t),t.ftxt?t.ftxt.focus():t.select.focus(),a(document).on("click.sumo",function(e){if(!t.select.is(e.target)&&0===t.select.has(e.target).length){if(!t.is_opened)return;t.hideOpts(),n.okCancelInMulti&&t._cnbtn()}}),t.is_floating&&(H=t.optDiv.children("ul").outerHeight()+2,t.is_multi&&(H+=parseInt(t.optDiv.css("padding-bottom"))),t.optDiv.css("height",H),a("body").addClass("sumoStopScroll")),t.setPstate())},setPstate:function(){var l=this;l.is_multi&&(l.is_floating||n.okCancelInMulti)&&(l.Pstate=[],l.E.find("option").each(function(e,t){t.selected&&l.Pstate.push(e)}))},callChange:function(){this.E.trigger("change").trigger("click")},hideOpts:function(){var e=this;e.is_opened&&(e.E.trigger("sumo:closing",e),e.is_opened=!1,e.select.removeClass("open").attr("aria-expanded","true").find("ul li.sel").removeClass("sel"),e.E.trigger("sumo:closed",e),a(document).off("click.sumo"),e.select.focus(),a("body").removeClass("sumoStopScroll"),n.search&&(e.ftxt.val(""),e.optDiv.find("ul.options li").removeClass("hidden"),e.optDiv.find(".no-match").toggle(!1)))},setOnOpen:function(){var e=this.optDiv.find("li.opt:not(.hidden)").eq(n.search?0:this.E[0].selectedIndex);e.hasClass("disabled")&&!(e=e.next(":not(disabled)")).length||(this.optDiv.find("li.sel").removeClass("sel"),e.addClass("sel"),this.showOpts())},nav:function(e){var t,l=this,i=l.ul.find("li.opt:not(.disabled, .hidden)"),s=l.ul.find("li.opt.sel:not(.hidden)"),n=i.index(s);if(l.is_opened&&s.length){if(e&&0<n)t=i.eq(n-1);else{if(!(!e&&n<i.length-1&&-1<n))return;t=i.eq(n+1)}s.removeClass("sel"),s=t.addClass("sel");var a=l.ul,o=a.scrollTop(),c=s.position().top+o;c>=o+a.height()-s.outerHeight()&&a.scrollTop(c-a.height()+s.outerHeight()),c<o&&a.scrollTop(c)}else l.setOnOpen()},basicEvents:function(){var t=this;t.CaptionCont.click(function(e){t.E.trigger("click"),t.is_opened?t.hideOpts():t.showOpts(),e.stopPropagation()}),t.select.on("keydown.sumo",function(e){switch(e.which){case 38:t.nav(!0);break;case 40:t.nav(!1);break;case 65:if(t.is_multi&&e.ctrlKey){t.toggSelAll(!e.shiftKey,1);break}return;case 32:if(n.search&&t.ftxt.is(e.target))return;case 13:t.is_opened?t.optDiv.find("ul li.sel").trigger("click"):t.setOnOpen();break;case 9:return void(n.okCancelInMulti||t.hideOpts());case 27:return n.okCancelInMulti&&t._cnbtn(),void t.hideOpts();default:return}e.preventDefault()}),a(window).on("resize.sumo",function(){t.floatingList()})},onOptClick:function(e){var t=this;e.click(function(){var e=a(this);if(!e.hasClass("disabled")){t.is_multi?(e.toggleClass("selected"),e.data("opt")[0].selected=e.hasClass("selected"),t.selAllState()):(e.parent().find("li.selected").removeClass("selected"),e.toggleClass("selected"),e.data("opt")[0].selected=!0),t.is_multi&&n.triggerChangeCombined&&(t.is_floating||n.okCancelInMulti)||(t.setText(),t.callChange()),t.is_multi||t.hideOpts()}})},setText:function(){var e=this;e.placeholder="";e.placeholder=n.placeholder,e.caption.html(e.placeholder),n.showTitle&&e.CaptionCont.attr("title",e.placeholder);var t=e.select.find("input.HEMANT123");return t.length&&t.val(e.getSelStr()),e.caption.addClass("placeholder"),e.placeholder},isMobile:function(){for(var e=navigator.userAgent||navigator.vendor||window.opera,t=0;t<n.nativeOnDevice.length;t++)if(0<e.toString().toLowerCase().indexOf(n.nativeOnDevice[t].toLowerCase()))return n.nativeOnDevice[t];return!1},setNativeMobile:function(){var e=this;e.E.addClass("SelectClass"),e.mob=!0,e.E.change(function(){e.setText()})},floatingList:function(){var e=this;e.is_floating=a(window).width()<=n.floatWidth,e.optDiv.toggleClass("isFloating",e.is_floating),e.is_floating||e.optDiv.css("height",""),e.optDiv.toggleClass("okCancelInMulti",n.okCancelInMulti&&!e.is_floating)},vRange:function(e){if(this.E.find("option").length<=e||e<0)throw"index out of bounds";return this},toggSel:function(e,t){var l,i=this;"number"==typeof t?(i.vRange(t),l=i.E.find("option")[t]):l=i.E.find('option[value="'+t+'"]')[0]||0,l&&!l.disabled&&l.selected!=e&&(l.selected=e,i.mob||a(l).data("li").toggleClass("selected",e),i.callChange(),i.setPstate(),i.setText(),i.selAllState())},toggDis:function(e,t){var l=this.vRange(t);(l.E.find("option")[t].disabled=e)&&(l.E.find("option")[t].selected=!1),l.mob||l.optDiv.find("ul.options li").eq(t).toggleClass("disabled",e).removeClass("selected"),l.setText()},toggSumo:function(e){var t=this;return t.enabled=e,t.select.toggleClass("disabled",e),e?(t.E.attr("disabled","disabled"),t.select.removeAttr("tabindex")):(t.E.removeAttr("disabled"),t.select.attr("tabindex","0")),t},toggSelAll:function(i,e){var t=this;t.optDiv.find("li.opt:not(.hidden,.disabled)").each(function(e,t){var l=(t=a(t)).hasClass("selected");i?l||t.trigger("click"):l&&t.trigger("click")}),e||(!t.mob&&t.selAll&&t.selAll.removeClass("partial").toggleClass("selected",!!i),t.callChange(),t.setText(),t.setPstate())},reload:function(){var e=this.unload();return a(e).SumoSelect(n)},unload:function(){var e=this;return e.select.before(e.E),e.E.show(),n.outputAsCSV&&e.is_multi&&e.select.find("input.HEMANT123").length&&e.E.attr("name",e.select.find("input.HEMANT123").attr("name")),e.select.remove(),delete s.sumo,s},add:function(e,t,l){if(void 0===e)throw"No value to add";var i=this;if(opts=i.E.find("option"),"number"==typeof t&&(l=t,t=e),void 0===t&&(t=e),opt=a("<option></option>").val(e).html(t),opts.length<l)throw"index out of bounds";return void 0===l||opts.length==l?(i.E.append(opt),i.mob||i.ul.append(i.createLi(opt))):(opts.eq(l).before(opt),i.mob||i.ul.find("li.opt").eq(l).before(i.createLi(opt))),s},remove:function(e){var t=this.vRange(e);t.E.find("option").eq(e).remove(),t.mob||t.optDiv.find("ul.options li").eq(e).remove(),t.setText()},selectItem:function(e){this.toggSel(!0,e)},unSelectItem:function(e){this.toggSel(!1,e)},selectAll:function(){this.toggSelAll(!0)},unSelectAll:function(){this.toggSelAll(!1)},disableItem:function(e){this.toggDis(!0,e)},enableItem:function(e){this.toggDis(!1,e)},enabled:!0,enable:function(){return this.toggSumo(!1)},disable:function(){return this.toggSumo(!0)},init:function(){return this.createElems(),this.setText(),this}},s.sumo.init())});return 1==t.length?t[0]:t}});