require(["../scripts/config.js"], function() {
	require(["jquery", "swiper", "template", "jquery.code"], function($, Swiper, template) {

		/**
		 * 随机验证码
		 */
		
		
		
		
		
		//生成验证码
		$(".num").createCode({
			len: 4
		});
		//定义开关，当OnOff为true的时候才能点击获取验证码按钮
		var OnOff = true;
		$(".getcode").click(function() {
			var $userName=$("#username").val();
			//检测用户手机号码输入是否规范
			if(/^1[0-9]{10}$/.test($userName)){				
				if(OnOff) {
					$(".mengban").stop().show();
					OnOff = false;
				}
			}else{
				alert("手机号输入错误");
			}
			
		});
		
		$("#confirm").click(function() {
			if($(".CodeNum").val().toLowerCase() == $(".num").children("input").val().toLowerCase()) {
				$(".mengban").stop().hide();
				$(".CodeNum").val("");
				//定义倒计时时间
				var $second = 60;
				$(".getcode").html(`${$second}秒后重新发送`);

				let timer = setInterval(function() {
					$second--;
					if($second == 0) {
						clearInterval(timer);
						$(".getcode").html("获取验证码");
						OnOff = true;
					} else {

						$(".getcode").html(`${$second}秒后重新发送`);
					}
				}, 1000);

			} else {
				//如果输入错误则重新生成验证码
				$(".num").createCode({
					len: 4
				});
				alert("验证码输入错误！");
			}
		});
	});
});