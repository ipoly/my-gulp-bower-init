define(function(require, exports, module) {
	
	exports.check_email = function(email,re){
		var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
		var msg = "";
		email = $("#"+email).val();
		if (email == ''){
			msg = "邮箱不能为空";
			$("#"+re).html(msg);
		}
		else if (!reg1.test(email)){
			msg = "邮箱格式错误";
			$("#"+re).html(msg);
		}else{
			$.ajax({
				type:"get",
				url:'/?user&q=login',
				data:'&q=check_email&email='+email,
				success:function(result){
					if (result=="1"){
						msg = "邮箱已经存在";	
						status = "1";
					}else{
						msg = "<font color='red'>可以注册</font>";	
						status = "0";
					}
					$("#"+re).html(msg);
				},
				cache:false
			});
		}
	}
 
 
	exports.check_username = function(username,re){
		var msg = "";
		var s = $("#"+username).val().length;
		var _username = $("#"+username).val();		
		if(exports.TextFilter(_username)!=_username){			
			msg = "用户名不能含有非法字符";
			$("#"+re).html(msg);
		}else if (exports.get_length(_username) <6){
			msg = "用户名不能小于3个汉字或6个字符";
			$("#"+re).html(msg);
		}else if (exports.get_length(_username)>15){
			msg = "用户名不能大于15个字符";
			$("#"+re).html(msg);
		}else if(_username.replace(/[0-9]/g,'')==''){
			msg = "用户名不能纯数字";
			$("#"+re).html(msg);
		}else{
			$.ajax({
				type:"get",
				url:'/?user&q=login',
				data:'&q=check_username&username='+_username,
				success:function(result){
					if (result=="1"){
						msg = "用户名已经存在";	
					}else if(result=="0"){
						msg = "<font color='red'>可以注册</font>";	
					}else{
					   msg=result;
					}
					$("#"+re).html(msg);
				},
				cache:false
			});
		}
	}
	
	exports.get_length= function (str){
		var len = str.length;
		var reLen = 0;
		for (var i = 0; i < len; i++) {        
			if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
				// 全角    
				reLen += 2;
			} else {
				reLen++;
			}
		}
		return reLen;    
	}
	exports.TextFilter=function(str){		 
		 var pattern=new RegExp("[`~%!@#^=''?~！@#￥……&——''？*()（），,。.<>、《》]"); //[]内输入你要过滤的字符，这里是我的
		 var rs="";
		 for(var i=0;i<str.length;i++){
		  rs+=str.substr(i,1).replace(pattern,'');
		 }
		 return rs;
	}
	
	exports.check_password = function(password,re){
		var s = $("#"+password).val().length;
		var x = $("#"+password).val();
		if (s<6 || s>15){
			$("#"+re).html("密码须在6-15位之间");
			return 1;
		}else{
			var pattern = /[A-Za-z][0-9]|[0-9][A-Za-z]/i;
			if(pattern.test(x)){
				var strong = checkStrong(x);
				if(strong==1){
					$("#"+re).html("<font color='red'>密码强度：弱</font>");
				}else if(strong==2){
					$("#"+re).html("<font color='red'>密码强度：中</font>");
				}else if(strong==3){
					$("#"+re).html("<font color='red'>密码强度：强</font>");
				}				
			}else{
				$("#"+re).html("密码过于简单，请尝试'字母+数字'的组合");
				return 2;
			}
		}
	}
	
	
	
	exports.check_confirm = function(password,re){
		if ($("#password").val()!=$("#"+password).val()){
			$("#"+re).html("密码不一致，请再次确认");
		}else{
			$("#"+re).html("<font color='red'>请重复上面的密码</font>");
		}
		
	}
	
	exports.check_phone = function(phone){
		var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
		if (!patrn.exec(phone)) {
			return 0;
		}
		return 1;
	}
	exports.check_mobile = function(mobile,re){
		var _mobile = $("#"+mobile).val();		
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(myreg.test(_mobile)) {
			console.log(_mobile);
			$.ajax({
				type:"get",
				url:'/?user&q=code/users/checkphone',
				data:{phone:_mobile},
				success:function(result){
					if (result=="1"){
						msg = "手机已经存在！";
						status = "1";
					}else{
						msg = "<font color='red'>可以注册</font>";	
						status = "0";
					}
					$("#"+re).html(msg);
				},
				cache:false
			});
			
			// return 1;
		}
		else
		{
			console.log(myreg.test(_mobile));
		}

	}
	 exports.reg = function (){
		 $('#email').live("blur",function(){
			exports.check_email("email","email_notice");	
		 })
		  $('#username').live("blur",function(){
			exports.check_username("username","username_notice");	
		})
		$('#mobile').live("blur",function(){
			exports.check_mobile("mobile","mobile_notice");	
		})
/* 		  $('#username').live("blur",function(){
			exports.check_Char("username","username_notice");	
		}) */
		   $('#password').live("blur",function(){
			exports.check_password("password","password_notice");	
		})
		   
		 $('#confirm_password').live("blur",function(){
			exports.check_confirm("confirm_password","conform_password_notice");	
		})
		 
		$("#reg_form").live("submit",function(){
			require("submitform");			
			var msg = '';			
			if($("#email").val()==''){
				msg+='邮箱不能为空'+'\n';
			}
			if($("#username").val()==''){
				msg+='用户名不能为空'+'\n';
			}
			if(exports.TextFilter($("#username").val())!=$("#username").val()){
				msg+='用户名不能含有非法字符'+'\n';
			}
			if($("#username").val().replace(/[0-9]/g,'')==''){
				msg+='用户名不能纯数字'+'\n';
			}
			if($("#password").val()==''){
				msg+='密码不能为空'+'\n';
			}
			if($("#password").val()!=$("#confirm_password").val()){
				msg+='两次密码不一样'+'\n';
			}			
			if(msg!=''){
				return false;
			}
			var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
		    if (!reg1.test($("#email").val())){
			    return false;
            }
   			$("#reg_form").ajaxSubmit({			
				 success: function (data, status) {
					 if(parseInt(data)==1){
						 alert("注册成功");
						 window.location.href="/?user&q=reg&type=email";
					 }else if(data=="no_server"){
					       $("#use_server").html("请接受服务条款!");
					 }else{
					    alert(data);
                        $('#valicode').attr('src','/?plugins&q=imgcode&t=' + Math.random());
                        $('#valicode').click();
						return false;
					 }
					return false;
				}
			 });
			 return false; // cancel conventional submit
			
		 })
		 //发送验证码
		 $("#phone_send").click(function(){
			var phone = $("#phone").val();
			var username = $("#username").val();
			if (phone==""){
				alert('手机号码不能为空');				
			}else{
				var phone_status = exports.check_phone(phone);
				if (phone_status==1){
					$.post("/?user&q=reg&type=ajax",{ phone: phone,username: username},
						function (result){
							if (result==1){
								alert("短信已经发送到你的手机");
							}else{
								alert(result);								
							}
					})
				}else{					
					alert('手机号码填写不正确');					
				}
			}
		})
		
	 }
	
	
	 exports.info_vip = function (){
				$(".user_info_vip").live("click",function(){
													var con = "";
													var vip = "";
				 con = $(this).attr("data-account");
				text = eval("({"+con+"})");
					var balance = text.balance;
					 vip = text.vip;
					var account = text.account;
					if (account>balance){
						deayou.use("header",function(e){e.ajaxConfirm("您的余额不足，是否马上进行充值","false","/?user&q=code/account/recharge_new");});
					}else{
						deayou.use("header",function(e){e.ajaxDialog("成为VIP会员","/?user&q=code/users/vip_new&vip="+vip+"&_time="+Math.random(1,9));});
					}
									  
				})
	 }
	 
	 
	exports.info_vip_new = function (){
		$("#user_info_vip_form").die();
		$("#user_info_vip_form").live("submit",function(){
			require("submitform");	
   			$("#user_info_vip_form").ajaxSubmit({
				 success: function (result, status) {
					 if(parseInt(result)>0){
						 deayou.use("header",function(e){e.ajaxYes("申请VIP成功","/?user&q=code/users/vip_log");});
						
					 }else{
						 alert(result);
					 }
				}

			 });
			 return false; // cancel conventional submit
		 })
	
	}
});

