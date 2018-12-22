require(["../scripts/config"], function () {
	require(["jquery", "template", "jquery.cookie"], function ($, template) {
		//加载公共头部
		$("#header").load("./commonHtml/head.html", function () {
			$.ajax({
				url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
				dataType: "jsonp",
				success: function (data) {
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
		 * 页面内特效
		 */

		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
			success: function (data) {
				$.cookie.raw = true;
				var goodsList = data.block_266[1].node;
				var cartList = JSON.parse($.cookie("goods"));
				// console.log(cartList);
				//得到添加到购物车的商品信息cartGoodsList
				var cartGoodsList = [];
				for (var i = 0; i < cartList.length; i++) {
					for (var j = 0; j < goodsList.length; j++) {
						if (cartList[i].goodsId == goodsList[j].skuid) {
							cartGoodsList.push(goodsList[j]);
						}
					}
				}
				//搭载模板引擎
				var $tempgoods = $("<div class='tempgoods'></div>");
				if (cartList.length == 0) {
					$("#catKong").show();
				} else {
					$("body").append($tempgoods);
				}

				//加载页面

				$tempgoods.load("./templates/shoppingCart_goods_template.html", function () {
					var cartListHtml = template("cartList", {
						list: cartGoodsList,
						cookList: cartList
					});
					$(".tableCart").append(cartListHtml);
					$("tbody").on("click", "em", function () {
						//删除页面元素
						$(this).parent().parent().remove();
						var $id = $(this).parent().parent().attr("index");
						var cartList = JSON.parse($.cookie("goods"));
						var $newCartGoodsList = $.grep(cartList, function (item, index) {
							return item.goodsId != $id;
						});
						$.cookie("goods", JSON.stringify($newCartGoodsList));
						zongJia();
						//如果商品全部被删除，购物车列表隐藏
						if (cartList.length < 2) {
							$(".tableCart").hide();
							$("#catKong").show();
						}
					});
					//点击加减添加和减少商品数量
					$(".quantity").on("click", "a", function () {
						var $id = $(this).parent().parent().attr("index");
						for (var i = 0; i < cartList.length; i++) {
							if (cartList[i].goodsId == $id) {
								var $p = cartList[i].price;
								break;
							}
						}
						if ($(this).hasClass("jia")) {
							$(this).siblings("span").html(++cartList[i].num);
						} else {
							$(this).siblings("span").html(Math.max(1, --cartList[i].num));
							if (cartList[i].num < 1) {
								cartList[i].num = 1;
							}
						}
						$(this).parent().siblings(".subtotal").html($p*cartList[i].num);
						$.cookie("goods", JSON.stringify(cartList));
						zongJia();
					});

					function zongJia(){
						var sub=0;
						$(".subtotal").each(function(index,item){
							sub+=parseInt(item.innerText);
						});
						$(".priceTotal").html("￥"+sub);
					}
					zongJia();
					
				});
			}
		});
	});
});