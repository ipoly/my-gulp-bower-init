define(function(require, exports, module) {

	exports.bank_del = function(){
		$(".bank_del").attr('href',"javascript:;");
		$(".bank_del").on("click",function(){
			var hr = $(this).attr('data-href');
			deayou.use("header",function(e){e.ajaxConfirm("ȷ��Ҫɾ�����˺�",hr,"/?user&q=code/account/bank");});
		 })
	}


	exports.cash = function(){
		$(".cach_cancel").attr('href',"javascript:;");
		$(".cach_cancel").on("click",function(){
			var hr = $(this).attr('data-href');
			deayou.use("header",function(e){e.ajaxConfirm("ȷ��Ҫȡ���˱�����",hr,"/?user&q=code/account/cash");});
		 })

		$("#account_cash_form").on("submit",function(){
			require("submitform");
			$("#account_cash_form").ajaxSubmit({
				 success: function(result, status) {
					 if (result==1){
						  deayou.use("header",function(e){e.ajaxYes("���ֳɹ�����ȴ�����Ա�����","false");});
						  location.href='/?user&q=code/account/cash';
					 }else{
						 deayou.use("header",function(e){e.ajaxError(result,"false");});
					 }
				}
			 });
			return false;
		 })
	}
});
