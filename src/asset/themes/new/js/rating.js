define(function(require, exports, module) {
	
	//��������Ϣ
	exports.check_info= function (form_id){
		 $("#"+form_id).submit(function(){	
			var _var = [["realname","��������Ϊ��"],["card_id","���֤���벻��Ϊ��"],["phone_num","�ֻ����벻��Ϊ��"],["birthday","���ձ�����д"],["edu","ѧ��Ҫѡ��"],["school_year","��ѧ��ݲ���Ϊ��"],["school","ѧУ����Ϊ��"],["jiguan_city","����Ҫѡ��"],["live_city","���ڵ�Ҫѡ��"],["address","��ַҪ��д"],["phone","�绰Ҫ��д"],["post_id","�������Ҫ��д"]]; 
			var _var_status=1;
			for(var i=0;i<_var.length;i++) { 
				if ($("#"+_var[i][0]).val()==""){
					deayou.use("header",function(e){e.ajaxError(_var[i][1],'false');});
					_var_status = 0;
					return false;
				}
			} 
			
		})
	}
	
		
	//��⹤����Ϣ
	exports.check_work= function (form_id){
		 $("#"+form_id).submit(function(){	
			var _var = [["name","��˾���Ʋ���Ϊ��"],["work_style","ְҵ״̬����Ϊ��"],["work_city","�������в���Ϊ��"],["company_type","��˾�����Ϊ��"],["company_size","��˾��ģ����Ϊ��"],["worktime1","��ְʱ�䲻��Ϊ��"],["office","ְ����Ϊ��"],["address","������ַ����Ϊ��"],["work_email","�������䲻��Ϊ��"],["tel","�����绰����Ϊ��"],["family_name","ֱϵ������������Ϊ��"],["family_relation","ֱϵ������ϵ����Ϊ��"],["family_phone","ֱϵ�����绰����Ϊ��"],["other_name","��������������Ϊ��"],["other_relation","�����˹�ϵ����Ϊ��"],["other_phone","�����˵绰����Ϊ��"]]; 
			var _var_status=1;
			for(var i=0;i<_var.length;i++) { 
				if ($("#"+_var[i][0]).val()==""){
					deayou.use("header",function(e){e.ajaxError(_var[i][1],'false');});
					_var_status = 0;
					return false;
				}
			} 
			
		})
	}
		
	exports.check_job= function (form_id){
		 $("#"+form_id).submit(function(){	
			var _var = [["name","��˾���Ʋ���Ϊ��"],["worktime1","��ְʱ�䲻��Ϊ��"],["office","ְ����Ϊ��"],["address","������ַ����Ϊ��"],["work_email","�������䲻��Ϊ��"],["tel","�����绰����Ϊ��"],["family_name","ֱϵ������������Ϊ��"],["family_relation","ֱϵ������ϵ����Ϊ��"],["family_phone","ֱϵ�����绰����Ϊ��"],["other_name","��������������Ϊ��"],["other_relation","�����˹�ϵ����Ϊ��"],["other_phone","�����˵绰����Ϊ��"]]; 
			var _var_status=1;
			for(var i=0;i<_var.length;i++) { 
				if ($("#"+_var[i][0]).val()==""){
					deayou.use("header",function(e){e.ajaxError(_var[i][1],'false');});
					_var_status = 0;
					return false;
				}
			} 
			
		})
	}
	
	
	//�ϴ�����
	exports.check_approve= function (form_id){
		
		//֤�������ϴ�
		$(".loan_approve_url").click(function(){
				var nid = $(this).attr('data-nid');
				if (form_id=="app"){
				deayou.use("header",function(e){e.ajaxDialog("�ϴ�����","/?user&q=code/borrow/loan_att&type=app&nid="+nid,"");});
				}else{
				deayou.use("header",function(e){e.ajaxDialog("�ϴ�����","/?user&q=code/borrow/loan_att&nid="+nid,"");});
				}
		 })
		
		//ʵ����֤
		$(".loan_approve_realname").click(function(){
				deayou.use("header",function(e){e.ajaxDialog("ʵ����֤","/?user&q=code/borrow/loan_realname","");});
		 })
		
		
		//�ֻ���֤
		$(".loan_approve_phone").click(function(){
				deayou.use("header",function(e){e.ajaxDialog("�ֻ���֤","/?user&q=code/borrow/loan_phone","");});
		 })
	}
	
	
	//�ֻ���֤
	exports.check_phone= function (){
		
		//�ֻ���ȡ��֤��
		$("#ajax_phone_get").click(function(){
			var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
            var o=$("#ajax_phone_get");
        	var wait=60;
			if ($("#ajax_phone").val()==""){
				$("#ajax_phone_msg").html('�ֻ����벻��Ϊ��');
			}else if (!patrn.exec($("#ajax_phone").val())) {
				$("#ajax_phone_msg").html('�ֻ������ʽ����ȷ');
			}else{
				var phone = $("#ajax_phone").val();
				$.post("/?user&q=code/approve/phone&style=ajax",{ phone: phone},
				function (result){
					if(result==1){
						$("#ajax_phone_msg").html('�����Ѿ����͵�����ֻ�,��ע�����');
                        var timeID=setInterval(function(){o.val("���·���"+wait);o.attr("disabled", "true");wait=wait-1;if(wait==-1){clearInterval(timeID);o.val("��ȡ��֤��");o.removeAttr("disabled")}},1000); 
					}else{
						alert(result);
					}					
				});
			}
				
		 })
         //�ֻ���ȡ��֤��--���ֺ��޸������˻�--2013-03-12   bincs
		$("#ajax_phone_get_tixian").click(function(){
			var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
            var o=$("#ajax_phone_get_tixian");
        	var wait=60;
			if ($("#ajax_phone").val()==""){
				$("#ajax_phone_msg").html('����û��ͨ���ֻ���֤�����Ƚ����ֻ���֤��');
			}else if (!patrn.exec($("#ajax_phone").val())) {
				$("#ajax_phone_msg").html('�ֻ������ʽ����ȷ');
			}else{
				var phone = $("#ajax_phone").val();
				$.post("/?user&q=code/approve/phone&type=send&style=ajax",{ phone: phone},
				function (result){
					if(result==1){
						$("#ajax_phone_msg").html('�����Ѿ����͵�����ֻ�,��ע�����');
                        var timeID=setInterval(function(){o.val("���·���"+wait);o.attr("disabled", "true");wait=wait-1;if(wait==-1){clearInterval(timeID);o.val("��ȡ��֤��");o.removeAttr("disabled")}},1000);  
					}else{
						alert(result);
					}
				});
			}
				
		 }
         )
         
         

                
         
         
		//��֤����֤
		$("#ajax_phone_submit").click(function(){
			var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
			var borrow_type = $("#borrow_type").val();
            var borrow_nid=$("#borrow_nid").val();
			var type = $("#type").val();
			if ($("#ajax_phone").val()==""){
				$("#ajax_phone_msg").html('�ֻ����벻��Ϊ��');
			}else if (!patrn.exec($("#ajax_phone").val())) {
				$("#ajax_phone_msg").html('�ֻ������ʽ����ȷ');
			}else if ($("#ajax_phone_code").val()=="") {
				$("#ajax_phone_msg").html('�ֻ���֤�벻��Ϊ��');
			}else{
				var phone_code = $("#ajax_phone_code").val();
				var phone_new = $("#ajax_phone").val();
				$.post("/?user&q=code/approve/phone&_type=borrow",{sms_code:phone_code,phone_new:phone_new},
					function (result){
						if (result==1){
							alert("�ֻ���֤�ɹ�");
							if(type==1){
								location.href="/?user&q=code/approve/phone";
							}else if(type=2){//��д���ϵ��ֻ���֤
		     					location.href="/?user&q=code/borrow/loan&p=info&type=credit";
                            }else{
								location.href="/?user&q=code/borrow/loan&p=info&borrow_type="+borrow_type;
							}
						}else{
							alert("��֤�����");
							//$("#ajax_phone_msg").html(result);
						}
				});
				
			}
				
		 })
         //��֤����֤
		$("#ajax_phone_submit_liucheng").click(function(){
			var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
			var borrow_type = $("#borrow_type").val();
            var borrow_nid=$("#borrow_nid").val();
			var type = $("#type").val();
			if ($("#ajax_phone").val()==""){
				$("#ajax_phone_msg").html('�ֻ����벻��Ϊ��');
			}else if (!patrn.exec($("#ajax_phone").val())) {
				$("#ajax_phone_msg").html('�ֻ������ʽ����ȷ');
			}else if ($("#ajax_phone_code").val()=="") {
				$("#ajax_phone_msg").html('�ֻ���֤�벻��Ϊ��');
			}else{
				var phone_code = $("#ajax_phone_code").val();
				var phone_new = $("#ajax_phone").val();
				$.post("/?user&q=code/approve/phone&_type=borrow",{sms_code:phone_code,phone_new:phone_new},
					function (result){
						if (result==1){
							alert("�ֻ���֤�ɹ�");
							if(type==1){
								location.href="/?user&q=code/approve/phone";
							}else{
		     					location.href="/?user&q=code/borrow/loan&p=tender&type=ok&borrow_nid="+borrow_nid;
                            }
						}else{
							alert("��֤�����");
							//$("#ajax_phone_msg").html(result);
						}
				});
				
			}
				
		 })
    
    
	}
});
	
