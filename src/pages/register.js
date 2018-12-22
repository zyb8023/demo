require(["../scripts/config"], function() {
	require(["jquery", "jquery.code"], function($) {

		$(function() {
			//生成验证码
			$(".code").createCode({
				len: 4
			});

			/**
			 * 注册验证
			 */
			//手机号码验证
			$(".usertelInput").blur(function() {
				if(/^1[0-9]{10}$/.test($(this).val())) {
					$(this).css("border-color", "#CCCCCC");
				} else {
					$(this).css("border-color", "red");
				}
			});
			//验证码
			$(".authCodeInput").blur(function() {
				if($(this).val().toLowerCase() == $(".code").children("input").val().toLowerCase()) {
					$(this).css("border-color", "#CCCCCC");
				} else {
					$(this).css("border-color", "red");
					$(".code").createCode({
						len: 4
					});
				}
			});
			//密码验证
			$(".userPwdInput").blur(function() {
				if(/^.{6,20}$/.test($(this).val())) {
					$(this).css("border-color", "#CCCCCC");
					//密码强度验证
					var hasNumber = /\d/.test($(this).val());
					var hasString = /[a-zA-Z]/.test($(this).val());
					var hasSpecialSign = /[^0-9a-zA-Z]/.test($(this).val());
					
					if(hasSpecialSign) {
						$(".qiangdu p").children().removeClass().addClass("btn-success");
					} else if(hasNumber && hasString) {
						$(".qiangdu p").children().removeClass().not(":last-child").addClass("btn-warning");
					} else {
						$(".qiangdu p").children().removeClass().first().addClass("btn-danger");
					}
				} else {
					$(this).css("border-color", "red");
					$(".qiangdu p").children().removeClass();
				}
			});
			//确认密码验证
			$(".reUserPwdInput").blur(function() {
				if($(this).val() === $(".userPwdInput").val()) {
					$(this).css("border-color", "#CCCCCC");
				} else {
					$(this).css("border-color", "red");
				}
			});

		});

	});
});