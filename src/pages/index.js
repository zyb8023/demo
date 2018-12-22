require(["../scripts/config.js"], function() {
	require(["jquery", "swiper", "template"], function($, Swiper, template) {
		$(function() {
			//加载头部
			$("#header").load("commonHtml/head.html", function() {
				$.ajax({
					url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
					dataType: "jsonp",
					success: function(data) {
						// console.log(data.block_266[0].node);

						//商店下拉列表数据
						var shopList = data.block_266[0].node;
						var $temp = $("<div class='temp'></div>");
						$("body").append($temp);
						$($temp).load("./templates/index_shopList_template.html", function() {
							var strHtml = template("shopList", {
								shopList: shopList
							});
							$(".storeLeft dl").append(strHtml);
						});
						
						
						//热门商品数据
						var hotGoods = data.block_266[1].node;
						var $temp = $("<div class='temp'></div>");
						$("body").append($temp);
						$($temp).load("./templates/index_goods_template.html", function() {
							var strHtml = template("goodsList", {
								goodsList: hotGoods
							});
							$(".hotGoodsList").append(strHtml);
							goodsListAnimate();

						});
					}
				});

				//商品列表动画
				function goodsListAnimate() {
					$(".hotGoodsList li .imgCon").hover(function() {
						$(this).children("a").show();
					}, function() {
						$(this).children("a").hide();
					})
				}
				//购物车列表下拉
				$(".shopCar").hover(function() {
					$(".shopCarList").stop().show();
					$(this).css("color", "#CCCCCC");
				}, function() {
					$(".shopCarList").stop().hide();
					$(this).css("color", "#666666");
				});

				//信息下拉菜单
				$(".msg").hover(function() {
					$(".msgList").stop().show();
					$(this).css("color", "#CCCCCC");
				}, function() {
					$(".msgList").stop().hide();
					$(this).css("color", "#666666");
				});

				//导航栏二级下拉菜单
				$(".navTitle li").on("mouseenter", function(event) {
					$(this).children().addClass("active").parent().siblings().children().removeClass("active");
					if($(this).hasClass("shop")) {
						$(".shopList").stop().show(200);
					}
					if($(this).hasClass("magazine")) {
						$(".magazineList").stop().show(100);
					}
					if($(this).hasClass("share")) {
						$(".shareList").stop().show(100);
					}
				});
				$(".navTitle li").on("mouseleave", function(event) {
					$(this).children().removeClass("active");
					if($(this).hasClass("shop")) {
						$(".shopList").stop().hide(200);
					}
					if($(this).hasClass("magazine")) {
						$(".magazineList").stop().hide();
					}
					if($(this).hasClass("share")) {
						$(".shareList").stop().hide();
					}
				});
				//搜索框的显示和隐藏
				$(".noOffmenu").click(function(e) {
					$(".search-input").stop().animate({
						width: 'toggle'
					}, 350);
					e.stopPropagation();
				});
				$(".search-input .txt").change(function() {
					if($(this).val() == "") {
						$(".noOffmenu").css("display", "block");
					} else {
						$(".noOffmenu").css("display", "none");
					}
				});
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
				});
			});

			//加载尾部
			$("#footer").load("./commonHtml/foot.html", function() {

				//service手型图标移动动画
				$("#service a").mouseenter(function() {
					var currentindex = 4;
					var num = 10;
					let timer = setInterval(function() {
						currentindex--;
						$(".hand").stop().animate({
							left: num
						}, 300);
						num = -num;
						if(currentindex == 0) {
							clearInterval(timer);
						}
					}, 300);
				});

				//客户端下载二维码和微信二维码
				$(".download").hover(function() {
					$(".QR_code").stop().show();
				}, function() {
					$(".QR_code").stop().hide();
				});

				$(".icon-weixin").hover(function() {
					$(".weixin").stop().show();
				}, function() {
					$(".weixin").stop().hide();
				});
			});

		});

	});
});