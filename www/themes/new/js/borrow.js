define(function(require, exports, module) {
	
	exports.borrow = function (){
		if (user_id==""){
			$(".borrow_jie").live("click",function(){
				$(this).attr("href","javascript:void(0)");
				deayou.use("header",function(e){e.ajaxLogin()});							   
			})	
		}
		$("#loan_form").submit(function(){	
			var _var = [["name","�����ⲻ��Ϊ��"],["account","������Ϊ��"],["borrow_apr","������ʲ���Ϊ��"]]; 
			var _var_status=1;
			for(var i=0;i<_var.length;i++) { 
				if ($("#"+_var[i][0]).val()==""){
					alert(_var[i][1]);
					_var_status = 0;
					return false;
				}
			}
			var min_apr=$("#minapr").val();
			var max_apr=$("#maxapr").val();
			var borrow_apr=$("#borrow_apr").val();
			if (borrow_apr<parseFloat(min_apr) || borrow_apr>parseFloat(max_apr)){
				alert("���ʲ��ڷ�Χ��");
				_var_status = 0;
				return false;
			}
			var borrow_apr = parseFloat(borrow_apr);
			var account = parseInt($("#account").val());
			var amount_use = parseInt($("#amount_use").val());			
			var lixi = (account*borrow_apr*0.01)/12;			
			if (account%50 != 0 || account==0){
				alert("�������Ϊ50�ı���");
				_var_status = 0;
				return false;
			}else if(lixi>amount_use && $("#borrow_type").val()==4){
				alert("���㣬���ܷ���");
				_var_status = 0;
				return false;
			}else if(account>amount_use && $("#borrow_type").val()!=4){
				alert("�����ܴ��ڿ��ö��");
				_var_status = 0;
				return false;
			}
			/* if ($("#account").val()<3000 || $("#account").val()>1000000){
				alert("�����ڷ�Χ��");
				_var_status = 0;
				return false;
			} */
		})
	}
	
	exports.detail = function (){
	
	}
	
	exports.tendering = function (){
		$("#user_borrow_tendering").live("submit",function(){
			require("submitform");	
			var borrow_nid = $("#borrow_nid").val();
   			$("#user_borrow_tendering").ajaxSubmit({
				 success: function (result, status) {
					if(result==1){
						deayou.use("header",function(e){e.ajaxYes("Ͷ��ɹ�","/invest/a"+borrow_nid+".html");});
					}else{
						alert(result);
					}
					return false;
				}

			 });
			 return false; // cancel conventional submit
		 })
	
	}
	
	exports.borrow_check = function (){	
		var email_status = $("#email_status").val();		
		$("#borrow_type1").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#amount").val()==0){
				alert("���ö��Ϊ0,��������");
				location.href="/?user&q=code/borrow/loan&type=1";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=1";
			}			
		});
		$("#borrow_type2").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#vouch_amount").val()==0){
				alert("�������Ϊ0,��������");
				location.href="/?user&q=code/borrow/loan&type=2";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=2";
			}			
		});
		$("#borrow_type3").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#diya_amount").val()==0){
				alert("��Ѻ���Ϊ0,��������");
				location.href="/?user&q=code/borrow/loan&type=3";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=3";
			}			
		});
		$("#borrow_type4").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=4";
			}
			
		});		
		$("#borrow_type5").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#worth_amount").val()==0){
				alert("��ֵ���Ϊ0,���ȳ�ֵ");
				location.href="/?user&q=code/account/recharge_new";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=5";
			}			
		});
		$("#borrow_type6").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#amount").val()==0){
				alert("���ö��Ϊ0,��������");
				location.href="/?user&q=code/borrow/loan&type=6";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=6";
			}			
		});
		$("#borrow_type7").click(function(){
			if(user_id==''){
				alert("����û��¼�����ȵ�¼");
				location.href="/?user&q=login";
			}else if(email_status!=1){
				alert("����û��������,���ȼ���");
				location.href="/?user&q=code/approve/email";
			}else if($("#amount").val()==0){
				alert("���ö��Ϊ0,��������");
				location.href="/?user&q=code/borrow/loan&type=6";
			}else{
				location.href="/?user&q=code/borrow/loan_now&type=6";
			}			
		});	
	}
		
	exports.amount = function (){
		$("#borrow_amount_form").live("submit",function(){
			require("submitform");	
   			$("#borrow_amount_form").ajaxSubmit({
				 success: function (result, status) {
					if(result==1){
						deayou.use("header",function(e){e.ajaxYes("����ɹ�����ȴ����","/?user&q=code/borrow/amount");});
					}else{
						deayou.use("header",function(e){e.ajaxError("�����ύ�����룬��ȴ����","false");});
					}
					return false;
				}

			 });
			 return false; // cancel conventional submit
		 })
	
	}
	
	
	exports.loan = function (){
		if (user_id==""){
			deayou.use("header",function(e){e.ajaxError("�㻹δ��½�����ȵ�½","/?user&q=login");});
		}else{
			if (realname_status==0){
				deayou.use("header",function(e){e.ajaxError("�㻹δͨ��ʵ����֤��������������","/?user&q=code/approve/realname");});
			}else if (amount_use<500){
				deayou.use("header",function(e){e.ajaxError("���Ŀ��ö�ȵ���500Ԫ������������","/?user&q=code/borrow/amount");});
			}else{
				$("#loan_form").live("submit",function(){
					require("submitform");	
					$("#loan_form").ajaxSubmit({
						 success: function (result, status) {
							if(result==1){
								deayou.use("header",function(e){e.ajaxYes("Ͷ��ɹ�","/index.php?user&q=code/borrow/publish");});
							}else{
								deayou.use("header",function(e){e.ajaxError(result,"false");});
							}
							return false;
						}
		
					 });
					 return false; 
				 })
			}			
		}
	}
	exports.borrow_content = function (borrow_nid,email_status,realname_status,phone_status,borrow_status_nid,borrow_userid){



		$(".borrow_type_class").live("click",function(){ 
			if(user_id==''){
					alert("����û��¼�����ȵ�¼");
					location.href = "/?user&q=login";
                    return false;
			}else if (borrow_status_nid=="loan" ){
				if (user_id==borrow_userid ){
					alert("����Ͷ�Լ��ı�");	
				}else if(email_status==0){
					alert("����δ���а�ȫ��Ϣ��֤�����Ƚ�����֤");
					location.href = "/?user&q=code/borrow/loan&p=tender&type=email";
                    return false;
				}else if(realname_status=='0'){
				    alert("����δ���а�ȫ��Ϣ��֤�����Ƚ�����֤");
					location.href = "/?user&q=code/borrow/loan&p=tender&type=realname";
                    return false;
					//var dia = $.dialog({
					//id: 'borr_realname',title:'������֤',content: 'url:/?user&q=code/borrow/loan&p=realname&borrow_nid='+borrow_nid,max: false,
					//min: false,lock:true});
				}else if(phone_status=='0'){
				    alert("����δ���а�ȫ��Ϣ��֤�����Ƚ�����֤");
					location.href = "/?user&q=code/borrow/loan&p=tender&type=phone";
                    return false;
                }else{
				    $(this).attr("href","#");
					window.location.href = "/?user&q=code/borrow/tender&p=invest&borrow_nid="+borrow_nid;
                    return false;
				
				}
			}
		})
    
		//if (parseFloat(account)>parseFloat(borrow_account_yes)){
			//$.get("/?user&q=code/borrow/loan_check_realname", function(result){
			//	if (result==1){
					//$(".borrow_tender_type").attr("href","/?user&q=code/borrow/loan_tender&borrow_nid="+borrow_nid);
			//	}else{					
				//	$(".borrow_tender_type").live("click",function(){
				//	$(".borrow_tender_type").attr("href","javascript:void(0)");
					if(user_id==''){
						alert("����û�е�¼�����ȵ�¼");
						location.href="/?user&q=login";
					//}else if($("#email_status").val()!=1){
						//alert("����û�м�����ȼ�������");
						//slocation.href="/?user&q=code/approve/email";
					}else{
						//deayou.use("header",function(e){e.ajaxDialog("��дʵ����Ϣ","/index.php?user&q=code/borrow/realname&borrow_nid="+borrow_nid);});
					}	
			//	}
			  //});
				
		
	}
	
	exports.loan_tender = function (){
	   //Ԥ������
       $("#tender_money").live("keyup",function(){
            var _money = $(this).val();
            _money=_money.replace(/[^0-9]/g,'');
            $(this).val(_money);
            var _borrow_nid = $(this).attr("data-nid");
            $("#tender_all").html("��0.00");
            $("#tender_lixi").html("��0.00");
            $("#tender_award").html("��0.00");
            $("#tender_detail").html(" ");
            if (_money!=""){
                $("#tender_income").show();
                $.ajax({
    				type:"get",
    				url:'/?user&q=code/borrow/loan',
    				data:'&p=get_income&account='+_money+'&borrow_nid='+_borrow_nid,
    				success:function(data){
    				    if (data!=""){
    				        var obj = eval("("+data+")");
                        $("#tender_all").html("��"+obj.all);
    					$("#tender_lixi").html("��"+obj.lixi);
    					$("#tender_award").html("��"+obj.award);
                        var _display = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td>�տ���</td><td>����</td><td>�տ���</td></tr>';
                         $.each(obj.list,function(i,_obj){
   _display += ' <tr ';
   if (i%2==0){
   _display += 'class="bgc"';
   }
   if (_obj.type=="lixi"){
    _title = "��Ϣ";
   } else if (_obj.type=="award"){
    _title = "����";
    _obj.date_time = "�����ͨ��";
       }
   _display += '><td>'+_obj.date_time+'</td><td>'+_title+'</td><td>��'+_obj.account+'</td></tr>';
   })
 _display += '</table>';
    					$("#tender_detail").html(_display);
                        }
    				},
    				cache:false
    			});
            }else{
                $("#tender_income").hide();
            }
            
            $(this).die();
       })
       $("#tender_income").live("click",function(){
        $("#tender_detail").toggle();
         if($("#tender_income").text()=="չ���տ���ϸ"){
            $("#tender_income").text('�����տ���ϸ');
        }else{
            $("#tender_income").text('չ���տ���ϸ');
        }
        })
       
		$("#loan_tender_form").live("submit",function(){
			
			var max=$("#max").val();
			var money=$("#money").val();
			var min=$("#min").val();
			if ($("#money").val()==""){
				alert("Ͷ�ʽ���Ϊ��");
				return false;								
			}else if (parseInt(max)<parseInt(money) && max>0){
				alert("Ͷ�ʽ��ܴ������Ͷ���");
				return false;				
			}else if (parseInt(min)>parseInt(money)){
				alert("Ͷ�ʽ���С����СͶ���");
				return false;
            }else if ($("#password_status_id").val()=="yes" && $("#borrow_password").val()==""){
				alert("������������룬����������������Ҫ��");
				return false;
			}else if ($("#paypassword").val()==""){
				alert("֧�����벻��Ϊ�ա�");
				return false;
			}else if ($("#valicode").val()==""){
				alert("��֤�벻��Ϊ�ա�");
				return false;
			
			}else{					
				$("#loan_tender_form").ajaxSubmit({
					 success: function (result) {
						if(result==1){
							alert("Ͷ��ɹ�");
							location.href = "/index.php?user&q=code/borrow/tender&p=now";
                            return false;	
						}else{
							alert(result);						
						}
						return false;
					}
	
				 });
				 return false; 	
			}
			
			return false;
		 })
	}
});
