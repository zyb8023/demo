require(["../scripts/config.js"], function() {
	require(["jquery", "swiper"], function($, Swiper) {

		//		//匹配不同宽度屏幕的布局
		//		var screenWidth=window.screen.width;
		//		var vw=100/(screenWidth/100);
		//		$("html").css("font-size",vw+"vw");

		//购物车列表下拉
		$(".shopCar").hover(function() {
			$(".shopCarList").show();
			$(this).css("color", "#CCCCCC");
		}, function() {
			$(".shopCarList").hide();
			$(this).css("color", "#666666");
		});

		//信息下拉菜单
		$(".msg").hover(function() {
			$(".msgList").show();
			$(this).css("color", "#CCCCCC");
		}, function() {
			$(".msgList").hide();
			$(this).css("color", "#666666");
		});

		//导航栏二级下拉菜单
		$(".navTitle li").on("mouseenter", function(event) {
			$(this).children().addClass("active").parent().siblings().children().removeClass("active");
			if($(this).hasClass("shop")) {
				$(".shopList").show(200);
			}
			if($(this).hasClass("magazine")) {
				$(".magazineList").show(100);
			}
			if($(this).hasClass("share")) {
				$(".shareList").show(100);
			}
		});
		$(".navTitle li").on("mouseleave", function(event) {
			if($(this).hasClass("shop")) {
				$(".shopList").hide(200);
			}
			if($(this).hasClass("magazine")) {
				$(".magazineList").hide();
			}
			if($(this).hasClass("share")) {
				$(".shareList").hide();
			}
		});
		//搜索框的显示和隐藏
		$("")
		
		
		
		

		//图片轮播
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
		$(".swiper-container").hover(function() {
			mySwiper.autoplay.stop();
		}, function() {
			mySwiper.autoplay.start();
		})

	});
});