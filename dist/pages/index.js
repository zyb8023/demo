"use strict";function _defineProperty(s,e,i){return e in s?Object.defineProperty(s,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[e]=i,s}require(["../scripts/config.js"],function(){require(["jquery","swiper"],function(e,s){var i;e(".shopCar").hover(function(){e(".shopCarList").show(),e(this).css("color","#CCCCCC")},function(){e(".shopCarList").hide(),e(this).css("color","#666666")}),e(".msg").hover(function(){e(".msgList").show(),e(this).css("color","#CCCCCC")},function(){e(".msgList").hide(),e(this).css("color","#666666")}),e(".navTitle li").on("mouseenter",function(s){e(this).children().addClass("active").parent().siblings().children().removeClass("active"),e(this).hasClass("shop")&&e(".shopList").show(200),e(this).hasClass("magazine")&&e(".magazineList").show(100),e(this).hasClass("share")&&e(".shareList").show(100)}),e(".navTitle li").on("mouseleave",function(s){e(this).hasClass("shop")&&e(".shopList").hide(200),e(this).hasClass("magazine")&&e(".magazineList").hide(),e(this).hasClass("share")&&e(".shareList").hide()}),e("");var t=new s(".swiper-container",(_defineProperty(i={autoplay:!0},"autoplay",{delay:3e3,disableOnInteraction:!1}),_defineProperty(i,"loop",!0),_defineProperty(i,"pagination",{el:".swiper-pagination",clickable:!0}),_defineProperty(i,"navigation",{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}),i));e(".swiper-container").hover(function(){t.autoplay.stop()},function(){t.autoplay.start()})})});