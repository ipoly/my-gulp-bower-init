define(function(require, exports, module) {
	
	exports.check_email = function(email,re){
		var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
		var msg = "";
		email = $("#"+email).val();
		if (email == ''){
			msg = "���䲻��Ϊ��";
			$("#"+re).html(msg);
		}
		else if (!reg1.test(email)){
			msg = "�����ʽ����";
			$("#"+re).html(msg);
		}else{
			$.ajax({
				type:"get",
				url:'/?user&q=login',
				data:'&q=check_email&email='+email,
				success:function(result){
					if (result=="1"){
						msg = "�����Ѿ�����";	
						status = "1";
					}else{
						msg = "<font color='red'>����ע��</font>";	
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
			msg = "�û������ܺ��зǷ��ַ�";
			$("#"+re).html(msg);
		}else if (exports.get_length(_username) <6){
			msg = "�û�������С��3�����ֻ�6���ַ�";
			$("#"+re).html(msg);
		}else if (exports.get_length(_username)>15){
			msg = "�û������ܴ���15���ַ�";
			$("#"+re).html(msg);
		}else if(_username.replace(/[0-9]/g,'')==''){
			msg = "�û������ܴ�����";
			$("#"+re).html(msg);
		}else{
			$.ajax({
				type:"get",
				url:'/?user&q=login',
				data:'&q=check_username&username='+_username,
				success:function(result){
					if (result=="1"){
						msg = "�û����Ѿ�����";	
					}else if(result=="0"){
						msg = "<font color='red'>����ע��</font>";	
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
				// ȫ��    
				reLen += 2;
			} else {
				reLen++;
			}
		}
		return reLen;    
	}
	exports.TextFilter=function(str){		 
		 var pattern=new RegExp("[`~%!@#^=''?~��@#������&����''��*()������,��.<>������]"); //[]��������Ҫ���˵��ַ����������ҵ�
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
			$("#"+re).html("��������6-15λ֮��");
			return 1;
		}else{
			var pattern = /[A-Za-z][0-9]|[0-9][A-Za-z]/i;
			if(pattern.test(x)){
				var strong = checkStrong(x);
				if(strong==1){
					$("#"+re).html("<font color='red'>����ǿ�ȣ���</font>");
				}else if(strong==2){
					$("#"+re).html("<font color='red'>����ǿ�ȣ���</font>");
				}else if(strong==3){
					$("#"+re).html("<font color='red'>����ǿ�ȣ�ǿ</font>");
				}				
			}else{
				$("#"+re).html("������ڼ򵥣��볢��'��ĸ+����'�����");
				return 2;
			}
		}
	}
	
	
	
	exports.check_confirm = function(password,re){
		if ($("#password").val()!=$("#"+password).val()){
			$("#"+re).html("���벻һ�£����ٴ�ȷ��");
		}else{
			$("#"+re).html("<font color='red'>���ظ����������</font>");
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
						msg = "�ֻ��Ѿ����ڣ�";
						status = "1";
					}else{
						msg = "<font color='red'>����ע��</font>";	
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
				msg+='���䲻��Ϊ��'+'\n';
			}
			if($("#username").val()==''){
				msg+='�û�������Ϊ��'+'\n';
			}
			if(exports.TextFilter($("#username").val())!=$("#username").val()){
				msg+='�û������ܺ��зǷ��ַ�'+'\n';
			}
			if($("#username").val().replace(/[0-9]/g,'')==''){
				msg+='�û������ܴ�����'+'\n';
			}
			if($("#password").val()==''){
				msg+='���벻��Ϊ��'+'\n';
			}
			if($("#password").val()!=$("#confirm_password").val()){
				msg+='�������벻һ��'+'\n';
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
						 alert("ע��ɹ�");
						 window.location.href="/?user&q=reg&type=email";
					 }else if(data=="no_server"){
					       $("#use_server").html("����ܷ�������!");
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
		 //������֤��
		 $("#phone_send").click(function(){
			var phone = $("#phone").val();
			var username = $("#username").val();
			if (phone==""){
				alert('�ֻ����벻��Ϊ��');				
			}else{
				var phone_status = exports.check_phone(phone);
				if (phone_status==1){
					$.post("/?user&q=reg&type=ajax",{ phone: phone,username: username},
						function (result){
							if (result==1){
								alert("�����Ѿ����͵�����ֻ�");
							}else{
								alert(result);								
							}
					})
				}else{					
					alert('�ֻ�������д����ȷ');					
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
						deayou.use("header",function(e){e.ajaxConfirm("�������㣬�Ƿ����Ͻ��г�ֵ","false","/?user&q=code/account/recharge_new");});
					}else{
						deayou.use("header",function(e){e.ajaxDialog("��ΪVIP��Ա","/?user&q=code/users/vip_new&vip="+vip+"&_time="+Math.random(1,9));});
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
						 deayou.use("header",function(e){e.ajaxYes("����VIP�ɹ�","/?user&q=code/users/vip_log");});
						
					 }else{
						 alert(result);
					 }
				}

			 });
			 return false; // cancel conventional submit
		 })
	
	}
});

