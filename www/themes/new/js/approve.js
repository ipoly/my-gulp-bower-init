define(function(require, exports, module) {

	exports.realname = function(){
		$("#approve_realname_form").on("submit",function(){
			var error = "";
			if ($("#realname").val()==""){
				error  = "姓名不能为空";
			}
			if ($("#card_id").val()==""){
				error  = "身份证号码不能为空";
			}
            if($('#card_pic1').val()==""){
                error = "身份证正面图片不能为空";
            }
            if($('#card_pic2').val()==""){
                error = "身份证背面图片不能为空";
            }
			if (error!=""){
			deayou.use("header",function(e){e.ajaxError(error,"false")});
			 return false; // cancel conventional submit
			}
		 })
	}
});