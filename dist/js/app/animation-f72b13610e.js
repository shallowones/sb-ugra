"use strict";!function(a,o,c,e){a(function(){for(var e=function(e,n){var t=a("#animation-"+n),r="#animation-trigger-"+n,i=c.staggerTo(t,1,{opacity:1,transform:"translateY(0)"},0);new o.Scene({triggerElement:r,triggerHook:.8}).setTween(i).addTo(e)},n=new o.Controller({addIndicators:!0}),t=0;t<1;t++)e(n,t+1)})}($,ScrollMagic,TweenMax,TimelineLite);