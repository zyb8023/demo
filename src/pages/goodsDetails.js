require(["../scripts/config"], function () {
	require(["jquery", "template", "swiper", "jquery.cookie"], function ($, template, Swiper) {

		//加载公共头部
		$("#header").load("./commonHtml/head.html", function () {
			$.ajax({
				url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
				dataType: "jsonp",
				success: function (data) {
					//商店下拉列表数据
					//商店下拉列表数据
					var shopList = data.block_266[0].node;
					var $temp = $("<div class='temp'></div>");
					$("body").append($temp);
					$($temp).load("./templates/index_shopList_template.html", function () {
						var strHtml = template("shopList", {
							shopList: shopList
						});
						$(".storeLeft dl").append(strHtml);
					});

					//购物车列表下拉
					$(".shopCar").hover(function () {
						$(".shopCarList").stop().show();
						$(this).css("color", "#CCCCCC");
					}, function () {
						$(".shopCarList").stop().hide();
						$(this).css("color", "#666666");
					});

					//信息下拉菜单
					$(".header-r .msg").hover(function () {
						$(".msgList").stop().show();
						$(this).css("color", "#CCCCCC");
					}, function () {
						$(".msgList").stop().hide();
						$(this).css("color", "#666666");
					});

					//导航栏二级下拉菜单
					$(".navTitle li").on("mouseenter", function (event) {
						$(this).children().addClass("active").parent().siblings().children().removeClass("active");
						if ($(this).hasClass("shop")) {
							$(".shopList").stop().show(200);
						}
						if ($(this).hasClass("magazine")) {
							$(".magazineList").stop().show(100);
						}
						if ($(this).hasClass("share")) {
							$(".shareList").stop().show(100);
						}
					});
					$(".navTitle li").on("mouseleave", function (event) {
						$(this).children().removeClass("active");
						if ($(this).hasClass("shop")) {
							$(".shopList").stop().hide(200);
						}
						if ($(this).hasClass("magazine")) {
							$(".magazineList").stop().hide();
						}
						if ($(this).hasClass("share")) {
							$(".shareList").stop().hide();
						}
					});
					//搜索框的显示和隐藏
					$(".noOffmenu").click(function (e) {
						$(".search-input").stop().animate({
							width: 'toggle'
						}, 350);
						e.stopPropagation();
					});
					$(".search-input .txt").change(function () {
						if ($(this).val() == "") {
							$(".noOffmenu").css("display", "block");
						} else {
							$(".noOffmenu").css("display", "none");
						}
					});
				}
			});
		});
		//加载公共页尾
		$("#footer").load("./commonHtml/foot.html", function () {
			//service手型图标移动动画
			$("#service a").mouseenter(function () {
				var currentindex = 4;
				var num = 10;
				let timer = setInterval(function () {
					currentindex--;
					$(".hand").stop().animate({
						left: num
					}, 300);
					num = -num;
					if (currentindex == 0) {
						clearInterval(timer);
					}
				}, 300);
			});

			//客户端下载二维码和微信二维码
			$(".download").hover(function () {
				$(".QR_code").stop().show();
			}, function () {
				$(".QR_code").stop().hide();
			});

			$(".icon-weixin").hover(function () {
				$(".weixin").stop().show();
			}, function () {
				$(".weixin").stop().hide();
			});
		});

		/**
		 * 商品详情数据请求
		 * 
		 */
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
			success: function (data) {
				var goodsList = data.block_266[1].node;
				//获取参数得到的id;
				var url = window.location.href;
				var goodsId = parseInt(url.split("?userid=")[1]).toString();
				//筛选出id为传参得到的id的商品
				var goods = $.grep(goodsList, function (item, index) {
					return item.skuid == goodsId;
				});
				//				console.log(goods[0]);
				//商品详情模板引擎加载
				var $tempgoods = $("<div class='tempgoods'></div>");
				$("body").append($tempgoods);
				$($tempgoods).load("./templates/goodsDetails_goodsDetails_template.html", function () {
					var goodsHtml = template("goods", {
						goods: goods[0]
					});
					$(".main-left").append(goodsHtml);
					//执行页面内动画
					pageAnimate();
					//添加购物车
					new ShopCar(goodsList);
				});
				//喜欢商品模板引擎加载
				$($tempgoods).load("./templates/goodsDetails_like_template.html", function () {
					var likeHtml = template("goodsLikeList", {
						likeList: goodsList
					});
					$(".main-right ul").append(likeHtml);
				});
			}
		});
		/**
		 * 页面内动画
		 */
		function pageAnimate() {
			//图片轮播
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: {
					disableOnInteraction: false,
				},
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					bulletActiveClass: 'my-bullet-active',
					renderBullet: function (index, className) {
						return `<span class="${className}"><img src="../static/images/good${index+1}.jpg " /></span>`;
					}
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

			});
			//颜色选择
			$(".colorList").on("click", ".list", function () {
				$(this).addClass("click").siblings().removeClass("click");
			})

			//数量加减
			$(".count .jian").click(function (e) {
				e.preventDefault();
				var $n = parseInt($(".count .num").html());
				$n--;
				$(".count .num").html(Math.max(1, $n));
			});
			$(".count .jia").click(function (e) {
				e.preventDefault();
				var $n = parseInt($(".count .num").html());
				$n++;
				$(".count .num").html($n);
			});
		}

		/**
		 * 购物车
		 */
		class ShopCar {
			constructor(dataList) {
				$.cookie.raw = true;
				this.dataList = dataList;
				this.addCar = $(".addCar");
				this.addEvent();
			}
			addEvent() {
				let _this = this;
				this.addCar.click(function () {
					_this.goodsId = $(this).attr("goodsId");
					_this.num = parseInt($(".count .num").html());
					_this.p=$(".price b").html();
					_this.price=parseInt(_this.p.substring(1));
					_this.setCookie();
					$("#addCarSuccess").show();
					$(".pop h3 span").click(function () {
						$("#addCarSuccess").hide();
					});
				});
			}
			setCookie() {
				//第一次添加
				this.goods = $.cookie("goods") ? JSON.parse($.cookie("goods")) : [];
				if (this.goods.length < 1) {
					this.goods.push({
						goodsId: this.goodsId,
						num: this.num,
						price:this.price
					});
					//不是第一次添加
				} else {
					//添加之前已经添加过的商品
					let _this = this;
					let onOff = true;
					$.each(this.goods, function (index, value) {
						if (value.goodsId == _this.goodsId) {
							//已经添加过该商品，再次添加只需改变数量
							_this.goods[index].num += _this.num;
							onOff = false;
						}
					});
					if (onOff) {
						//未添加过该商品，所以重新添加即可
						this.goods.push({
							goodsId: this.goodsId,
							num: this.num,
							price:this.price
						});
						onOff = true;
					}

				}
				$.cookie("goods", JSON.stringify(this.goods));
			}

		}

	});
});