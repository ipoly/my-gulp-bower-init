define(function(require, exports, module) {

	exports.realname = function(){
		$("#approve_realname_form").on("submit",function(){
			var error = "";
			if ($("#realname").val()==""){
				error  = "��������Ϊ��";
			}
			if ($("#card_id").val()==""){
				error  = "���֤���벻��Ϊ��";
			}
            if($('#card_pic1').val()==""){
                error = "���֤����ͼƬ����Ϊ��";
            }
            if($('#card_pic2').val()==""){
                error = "���֤����ͼƬ����Ϊ��";
            }
			if (error!=""){
			deayou.use("header",function(e){e.ajaxError(error,"false")});
			 return false; // cancel conventional submit
			}
		 })
	}
});