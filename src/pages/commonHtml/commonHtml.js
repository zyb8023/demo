require(["../../scripts/config"], function() {
	require(["jquery"], function($) {
		console.log("a");
	});
});






//
//$.ajax({
//			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266",
//			dataType: "jsonp",
//			success: function(data) {
//				//商店下拉列表数据
//				var shopList = data.block_266[0].node;
//				var $temp = $("<div class='temp'></div>");
//				$(".ListData").append($temp);
//				$($temp).load("../templates/index_shopList_template.html", function() {
//					var strHtml = template("shopList", {
//						shopList: shopList
//					});
//					$(".storeLeft dl").append(strHtml);
//				});
//
//				//导航栏二级下拉菜单
//				$(".navTitle li").on("mouseenter", function(event) {
//					$(this).children().addClass("active").parent().siblings().children().removeClass("active");
//					if($(this).hasClass("shop")) {
//						$(".shopList").stop().show(200);
//					}
//					if($(this).hasClass("magazine")) {
//						$(".magazineList").stop().show(100);
//					}
//					if($(this).hasClass("share")) {
//						$(".shareList").stop().show(100);
//					}
//				});
//				$(".navTitle li").on("mouseleave", function(event) {
//					$(this).children().removeClass("active");
//					if($(this).hasClass("shop")) {
//						$(".shopList").stop().hide(200);
//					}
//					if($(this).hasClass("magazine")) {
//						$(".magazineList").stop().hide();
//					}
//					if($(this).hasClass("share")) {
//						$(".shareList").stop().hide();
//					}
//				});
//				//搜索框的显示和隐藏
//				$(".noOffmenu").click(function(e) {
//					$(".search-input").stop().animate({
//						width: 'toggle'
//					}, 350);
//					e.stopPropagation();
//				});
//				$(".search-input .txt").change(function() {
//					if($(this).val() == "") {
//						$(".noOffmenu").css("display", "block");
//					} else {
//						$(".noOffmenu").css("display", "none");
//					}
//				});
//			}
//		});