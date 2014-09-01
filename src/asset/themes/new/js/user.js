/* 检查长度 */
function str_length(str){
	sl1=str.length;
	strLen=0;
	for(i=0;i<sl1;i++){
		if(str.charCodeAt(i)>255) strLen+=3;
	 else strLen++;
	}
	return strLen;
}

/* 检测是否是中文 */
function str_chinese(name) {
	if(name.length == 0)
	return "";
	for(i = 0; i < name.length; i++){
	if(name.charCodeAt(i) > 128)
	return true;
	}
	return false;
}


//检查真实百家姓
/*
function str_xing(aname){
	var xing = new Array(		
	'赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨',
	'朱','秦','尤','许','何','吕','施','张','孔','曹','严','华','金','魏','陶','姜',
	'戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭','郎',
	'鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳','酆','鲍','史','唐',
	'费','廉','岑','薛','雷','贺','倪','汤','滕','殷','罗','毕','郝','邬','安','常',
	'乐','于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄',
	'和','穆','萧','尹','姚','邵','堪','汪','祁','毛','禹','狄','米','贝','明','臧',
	'计','伏','成','戴','谈','宋','茅','庞','熊','纪','舒','屈','项','祝','董','粱',
	'杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江','童','颜','郭',
	'梅','盛','林','刁','钟','徐','邱','骆','高','夏','蔡','田','樊','胡','凌','霍',
	'虞','万','支','柯','咎','管','卢','莫','经','房','裘','缪','干','解','应','宗',
	'宣','丁','贲','邓','郁','单','杭','洪','包','诸','左','石','崔','吉','钮','龚',
	'程','嵇','邢','滑','裴','陆','荣','翁','荀','羊','於','惠','甄','魏','加','封',
	'芮','羿','储','靳','汲','邴','糜','松','井','段','富','巫','乌','焦','巴','弓',
	'牧','隗','山','谷','车','侯','宓','蓬','全','郗','班','仰','秋','仲','伊','宫',
	'宁','仇','栾','暴','甘','钭','厉','戎','祖','武','符','刘','姜','詹','束','龙',
	'叶','幸','司','韶','郜','黎','蓟','薄','印','宿','白','怀','蒲','台','从','鄂',
	'索','咸','籍','赖','卓','蔺','屠','蒙','池','乔','阴','郁','胥','能','苍','双',
	'闻','莘','党','翟','谭','贡','劳','逄','姬','申','扶','堵','冉','宰','郦','雍',
	'郤','璩','桑','桂','濮','牛','寿','通','边','扈','燕','冀','郏','浦','尚','农',
	'温','别','庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾','鱼','容',
	'向','古','易','慎','戈','廖','庚','终','暨','居','衡','步','都','耿','满','弘',
	'匡','国','文','寇','广','禄','阙','东','殴','殳','沃','利','蔚','越','夔','隆',
	'师','巩','厍','聂','晁','勾','敖','融','冷','辛','阚','那','简','饶','空','曾',
	'毋','沙','乜','养','鞠','须','丰','巢','关','蒯','相','查','后','江','红','游',
	'竺','权','逯','盖','益','桓','公','万','俟','司','马','上','官','欧','阳','夏',
	'侯','诸','葛','闻','人','东','方','赫','连','皇','甫','尉','迟','公','羊','澹',
	'台','公','冶','宗','政','濮','阳','淳','于','仲','孙','太','叔','申','屠','公',
	'孙','乐','正','轩','辕','令','狐','钟','离','闾','丘','长','孙','慕','容','鲜',
	'于','宇','文','司','徒','司','空');	
	if(!in_array(aname.substr(0,1),xing)){
		return false;
	}
	return true;
}

*/
function str_xing(aname){
	return true;	
}
/* 检查邮箱 */
function checkEmail(email){
	var submit_disabled = false;
	var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
	
	if (email == ''){
		document.getElementById('email_notice').innerHTML = email_msg_blank;
		submit_disabled = true;
	}
	else if (!reg1.test(email)){
		document.getElementById('email_notice').innerHTML =email_msg_format;
		submit_disabled = true;
	}else{
		$.get("index.php?user", { q: "action/check_email", email: email},function (result){
			if ( result == true ){
				document.getElementById('email_notice').innerHTML = msg_can_reg;
				submit_disabled = false;
			}
			else{
				document.getElementById('email_notice').innerHTML = email_msg_exist;
				submit_disabled = true;
			}																			
		}); 
	}
 
	if( submit_disabled ){
		$("#submit").display= 'disabled';
		return false;
	}else{
		$("#submit").display= '';
		return true;
	}
}

/* 检查用户名 */
function checkUsername(username){
	var submit_disabled = false;
	if (username!=""){
		var str_len = str_length(username);
	}
	var patrn=/^([a-zA-Z0-9_]|[\u4E00-\u9FA5]){2,15}$/;
	if (username == ""){
		document.getElementById('username_notice').innerHTML = username_msg;
		submit_disabled = true;
	}
	else  if (!patrn.exec(username)) {
		document.getElementById('username_notice').innerHTML = username_msg;
		submit_disabled = true;
	}
	
	else if (str_len <4){
		document.getElementById('username_notice').innerHTML = username_msg;
		submit_disabled = true;
	}
 	else if (str_len >15){
		document.getElementById('username_notice').innerHTML = username_msg;
		submit_disabled = true;
	}else{
		$.get("index.php?user", { q: "action/check_username", username: username},function (result){
			if ( result == true ){
				document.getElementById('username_notice').innerHTML = msg_can_reg;
				submit_disabled = false;
			}
			else{
				document.getElementById('username_notice').innerHTML = username_msg_exist;
				submit_disabled = true;
			}																			
		}); 	
	}
	if( submit_disabled ){
		$("#submit").display= 'disabled';
		return false;
	}else{
		document.getElementById('submit').display="";
		return true;
	}
	
}

//检查密码
function checkPassword( password ){
	var submit_disabled = false;
    if ( password.length < 6 ||  password.length > 20 ){
        document.getElementById('password_notice').innerHTML = password_msg_shorter;
		submit_disabled = true;
    }
    else{
        document.getElementById('password_notice').innerHTML = msg_can_reg;
    }
	
	if( submit_disabled ){
		$("#submit").display= 'disabled';
		return false;
	}else{
		$("#submit").display= '';
		return true;
	}
}
//验证密码
function checkConformPassword( conform_password ){
	var submit_disabled = false;
    password = document.getElementById('password').value;
    if ( conform_password.length < 6 ){
        document.getElementById('conform_password_notice').innerHTML = password_msg_shorter;
        submit_disabled =  true;
    }
	else   if ( conform_password != password ){
        document.getElementById('conform_password_notice').innerHTML = password_msg_confirm_invalid;
		 submit_disabled =  true;
    }
    else {
        document.getElementById('conform_password_notice').innerHTML = msg_can_reg;
    }
	if( submit_disabled ){
		$("#submit").display= 'disabled';
		return false;
	}else{
		$("#submit").display= '';
		return true;
	}
}

//检查真实姓名
function checkRealname(realname){
	var submit_disabled = false;
	if (realname == '') {
		document.getElementById('realname_notice').innerHTML = realname_msg_empty;
		submit_disabled = true;
	}
	else if (realname.length <2 || realname.length >6 ){
		document.getElementById('realname_notice').innerHTML = realname_msg_len;
		submit_disabled = true;
	}
	else  if (str_chinese(realname)==false){
		document.getElementById('realname_notice').innerHTML = realname_msg_chn;
		submit_disabled = true;
	}
	else  if (str_xing(realname)==false)	{
		document.getElementById('realname_notice').innerHTML = realname_msg_war;
		submit_disabled = true;
	}else{
		document.getElementById('realname_notice').innerHTML = msg_can_reg;
	}
	if( submit_disabled ){
		$("#submit").display= 'disabled';
		return false;
	} 
	else{
		$("#submit").display= '';
		return true;
	}		
}

//检验注册
function userReg(){
    if (checkEmail($("#email").val())  && checkUsername($("#username").val()) && checkPassword($("#password").val())&&checkConformPassword($("#conform_password").val()) ){
		$("#submit").display='display';
		return true;
	}
	$("#submit").display='display';
   	return false;
}

var msg_can_reg = "<font color=blue># 可以注册</font>";
var username_msg = '* 请输入4-15位字符(中文5个).英文,数字,"_"的组合。';
var username_msg_exist = "* 用户名已经存在,请重新输入";
var email_msg_empty = "* Email 为空";
var email_msg_invalid = "* Email 不是合法的地址";
var email_msg_blank = "* 邮件地址不能为空";
var email_msg_exist = "* 邮箱已存在,请重新输入";
var email_msg_format = "* 邮件地址不合法";
var password_msg_shorter = "* 登录密码不能少于 6 个字符。";
var password_msg_confirm_invalid = "* 两次输入密码不一致";
var realname_msg_empty = "* 真实姓名不能为空";
var realname_msg_len = "* 真实姓名不能少于2个汉字,真实姓名不能多于6个汉字";
var realname_msg_chn = "* 真实姓名只能为汉字";
var realname_msg_war = "* 你的姓氏是错误的,请填写真实的姓氏"; 

/* 会员修改密码 */
function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }
 if (new_password.length <6)
  {
    msg += new_password_length + '\n';
  }
  
  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += confirm_password_invalid + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 对会员的留言输入作处理
 */
function userEditMessage()
{
  var frm         = document.forms['formEdit'];
  var msg_title   = frm.elements['title'].value;
  var msg_content = frm.elements['content'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += title_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  var user_name = frm.elements['username'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
  }

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      errorMsg += email_address_error + '\n';
    }
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }

  return true;
}

/* *
 * 会员找回密码时，对输入作处理
 */
function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}



/* *
 * 会员登录
 */
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';

  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}


/* *
 * 对会员的咨询服务
 */
function submitAsk()
{
  var frm         = document.forms['formAsk'];
  var msg_title   = frm.elements['title'].value;
  var msg_content = frm.elements['content'].value;
  var email = frm.elements['email'].value;
  var phone = frm.elements['phone'].value;
  var qq = frm.elements['qq'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += title_limit + '\n';
  }
 if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  
	 if (qq.length == 0 || (qq.length > 0 && (!Utils.isNumber(qq))))
  {
    msg += qq_invalid + '\n';
  }
  
   if (phone.length>0 || phone.length == 0 )
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}




/* *
 * 团购
 */
function submitGroup()
{
 var frm      = document.forms['formGroup'];
  var msg_title = frm.elements['title'].value;
  var msg_content = frm.elements['content'].value;
   var remark = frm.elements['remark'].value;
  var price = frm.elements['price'].value;
  var account = frm.elements['account'].value;
  var amount = frm.elements['amount'].value;
  var endtime = frm.elements['endtime'].value;
  var msg = '';
  var reg = null;

  if (msg_title.length == 0)
  {
    msg += title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += title_limit + '\n';
  }
if (endtime.length == 0 || (endtime.length > 0 && (!Utils.isNumber(endtime))))
  {
    msg += endtime_invalid + '\n';
  }
  if (endtime.length == 0 || (price.length > 0 && (!Utils.isNumber(price))))
  {
    msg += price_invalid + '\n';
  }
  
  if (amount.length == 0 || (amount.length > 0 && (!Utils.isNumber(amount))))
  {
    msg += amount_invalid + '\n';
  }
	 if (account.length == 0 || (account.length > 0 && (!Utils.isNumber(account))))
  {
    msg += account_invalid + '\n';
  }
  
   
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}


/* *
 * 订单
 */
function submitpaotui()
{
 var frm      = document.forms['formpaotui'];
  var msg_title = frm.elements['title'].value;
  var msg_content = frm.elements['content'].value;
   var realname = frm.elements['realname'].value;
  var email = frm.elements['email'].value;
  var address = frm.elements['address'].value;
  var qq = frm.elements['qq'].value;
  var phone = frm.elements['phone'].value;
  var msg = '';
  var reg = null;

  if (msg_title.length == 0)
  {
    msg += title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += title_limit + '\n';
  }

	if (realname.length == 0)
  {
    msg += realname_empty + '\n';
  }
  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  
  if (address.length == 0)
  {
    msg += address_empty + '\n';
  }
  
	 if (qq.length == 0 || (qq.length > 0 && (!Utils.isNumber(qq))))
  {
    msg += qq_invalid + '\n';
  }
  
   if (phone.length>0 || phone.length == 0 )
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}
function address_o(id){
	Ajax.call( '?s=address&t=get_address', 'address_id=' + id, address_callback , 'GET', 'TEXT', true, true );	
	
}
function address_callback(result)
{
	var strs= new Array(); //定义一数组
	strs=result.split("|@*"); 
	var frm      = document.forms[0];
	frm.elements['realname'].value =strs[5];
  frm.elements['email'].value =strs[6];
  frm.elements['address'].value =strs[11];
  frm.elements['postcode'].value =strs[12];
  frm.elements['qq'].value =strs[9];
  frm.elements['wangwang'].value =strs[10];
  frm.elements['phone'].value =strs[8];
  frm.elements['tel'].value =strs[7];
  frm.elements['building'].value =strs[13];
  frm.elements['besttime'].value =strs[14];
  ProvinceCity(strs[2],strs[3],strs[4]);
}
function registed_callback(result){
		
  if (result == true)
  {
    document.getElementById('username_notice').innerHTML = msg_can_rg;
    $("#submit").display= '';
  }
  else
  {
    document.getElementById('username_notice').innerHTML = msg_un_registered;
    $("#submit").display= 'disabled';
  }
}

function check_email_callback(result)
{
  if ( result == true )
  {
    document.getElementById('email_notice').innerHTML = msg_can_rg;
    $("#submit").display= '';
  }
  else
  {
    document.getElementById('email_notice').innerHTML = msg_email_registered;
    $("#submit").display= 'disabled';
  }
}

/* *
 * 处理注册用户
 */
function register()
{
  var frm  = document.forms['formUser'];
///  var username  = Utils.trim(frm.elements['username'].value);
  var email  = frm.elements['email'].value;
  var password  = Utils.trim(frm.elements['password'].value);
  var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
  var realname = Utils.trim(frm.elements['realname'].value);
 var school = Utils.trim(frm.elements['school'].value);
  var start_university = Utils.trim(frm.elements['start_university'].value);
   var middle_school = Utils.trim(frm.elements['middle_school'].value);
    var start_middle_school = Utils.trim(frm.elements['start_middle_school'].value);
  var msg = "";
  // 检查输入
  /*
  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }
  else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/))
  {
    msg += username_invalid + '\n';
  }
  else if (username.length < 3)
  {
    //msg += username_shorter + '\n';
  }
*/
  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }
  else if (password.length < 6)
  {
    msg += password_shorter + '\n';
  }
  if (confirm_password != password )
  {
    msg += confirm_password_invalid + '\n';
  }
 
  if (school.length == "")
  {
    msg += school_empty + '\n';
  }
 if (start_university.length == "")
  {
    msg += start_university_empty + '\n';
  }
  if (middle_school.length == "")
  {
    msg += middle_school_empty + '\n';
  }
  if (start_middle_school.length == "")
  {
    msg += start_middle_school_empty + '\n';
  }
  if (realname=="")
  {
    msg += realname_empty + '\n';
  }else if (realname.length <2 || realname.length >6 )
  {
     msg += realname_len + '\n';
  }else  if (isChinese(realname)==false)
  {
    msg += realname_chn + '\n';
  }else  if (check_Realname(realname)==false)
  {
    msg += realname_war + '\n';
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
	for(var i in haystack) {
	if(haystack[i] == needle) {
	return true;
	}
	}
	}
	return false;
}
function saveOrderAddress(id)
{
  var frm           = document.forms['formAddress'];
  var consignee     = frm.elements['consignee'].value;
  var email         = frm.elements['email'].value;
  var address       = frm.elements['address'].value;
  var zipcode       = frm.elements['zipcode'].value;
  var tel           = frm.elements['tel'].value;
  var mobile        = frm.elements['mobile'].value;
  var sign_building = frm.elements['sign_building'].value;
  var best_time     = frm.elements['best_time'].value;

  if (id == 0)
  {
    alert(current_ss_not_unshipped);
    return false;
  }
  var msg = '';
  if (address.length == 0)
  {
    msg += address_name_not_null + "\n";
  }
  if (consignee.length == 0)
  {
    msg += consignee_not_null + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 会员余额申请
 */
function submitSurplus()
{
  var frm            = document.forms['formSurplus'];
  var amount = frm.elements['money'].value;
  var remark  = frm.elements['remark'].value;
   var type  = frm.elements['type'].value;
  var pay_id     = 0;
  var msg = '';

  if (amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( isNaN(amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (remark.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  if (type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="pay_id" && frm.elements[i].checked)
      {
        pay_id = frm.elements[i].value;
        break;
      }
    }

    if (pay_id == 0)
    {
      alert(pay_empty);
      return false;
    }
  }

  return true;
}

/* *
 *  处理用户添加一个红包
 */
function addBonus()
{
  var frm      = document.forms['addBouns'];
  var bonus_sn = frm.elements['bonus_sn'].value;

  if (bonus_sn.length == 0)
  {
    alert(bonus_sn_empty);
    return false;
  }
  else
  {
    var reg = /^[0-9]{10}$/;
    if ( ! reg.test(bonus_sn))
    {
      alert(bonus_sn_error);
      return false;
    }
  }

  return true;
}

/* *
 *  合并订单检查
 */
function mergeOrder()
{
  if (!confirm(confirm_merge))
  {
    return false;
  }

  var frm        = document.forms['formOrder'];
  var from_order = frm.elements['from_order'].value;
  var to_order   = frm.elements['to_order'].value;
  var msg = '';

  if (from_order == 0)
  {
    msg += from_order_empty + '\n';
  }
  if (to_order == 0)
  {
    msg += to_order_empty + '\n';
  }
  else if (to_order == from_order)
  {
    msg += order_same + '\n';
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

/* *
 * 订单中的商品返回购物车
 * @param       int     orderId     订单号
 */
function returnToCart(orderId)
{
  Ajax.call('?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');
}

function returnToCartResponse(result)
{
  alert(result.message);
}

/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  //document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
  //document.getElementById("pwd_middle").style.borderBottom = Mcolor;
  //document.getElementById("pwd_high").style.borderBottom   = Hcolor;

}

function changeType(obj)
{
  if (obj.getAttribute("min") && document.getElementById("ECS_AMOUNT"))
  {
    document.getElementById("ECS_AMOUNT").disabled = false;
    document.getElementById("ECS_AMOUNT").value = obj.getAttribute("min");
    if (document.getElementById("ECS_NOTICE") && obj.getAttribute("to") && obj.getAttribute('fee'))
    {
      var fee = parseInt(obj.getAttribute("fee"));
      var to = parseInt(obj.getAttribute("to"));
      if (fee < 0)
      {
        to = to + fee * 2;
      }
      document.getElementById("ECS_NOTICE").innerHTML = notice_result + to;
    }
  }
}

function calResult()
{
  var amount = document.getElementById("ECS_AMOUNT").value;
  var notice = document.getElementById("ECS_NOTICE");

  reg = /^\d+$/;
  if (!reg.test(amount))
  {
    notice.innerHTML = notice_not_int;
    return;
  }
  amount = parseInt(amount);
  var frm = document.forms['transform'];
  for(i=0; i < frm.elements['type'].length; i++)
  {
    if (frm.elements['type'][i].checked)
    {
      var min = parseInt(frm.elements['type'][i].getAttribute("min"));
      var to = parseInt(frm.elements['type'][i].getAttribute("to"));
      var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
      var result = 0;
      if (amount < min)
      {
        notice.innerHTML = notice_overflow + min;
        return;
      }

      if (fee > 0)
      {
        result = (amount - fee) * to / (min -fee);
      }
      else
      {
        //result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
        result = amount * (to + fee) / min + fee;
      }

      notice.innerHTML = notice_result + parseInt(result + 0.5);
    }
  }
}
//收货地址编辑
function submitQgou()
{
  var frm = document.forms['formQgou'];
  var realname = frm.elements['realname'].value;
  var email = frm.elements['email'].value;
  var address = frm.elements['address'].value;
  var qq = frm.elements['qq'].value;
  var phone = frm.elements['phone'].value;
  var msg = '';
  var reg = null;

	if (realname.length == 0)
  {
    msg += realname_empty + '\n';
  }
  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  
  if (address.length == 0)
  {
    msg += address_empty + '\n';
  }
  
	 if (qq.length == 0 || (qq.length > 0 && (!Utils.isNumber(qq))))
  {
    msg += qq_invalid + '\n';
  }
  
   if (phone.length>0 || phone.length == 0 )
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}
function changeDisplay(id){
						var aa = document.getElementById(id).style.display;
						if (aa==""){
							document.getElementById(id).style.display="none";
						}else{
							document.getElementById(id).style.display="";
						}
					}



var process_request = "正在处理您的请求...";
var username_empty = "- 用户名不能为空。";
var username_shorter = "- 用户名长度不能少于 3 个字符。";
var username_invalid = "- 用户名只能是由字母数字以及下划线组成。";
var password_empty = "- 登录密码不能为空。";
var paypwd_empty = "- 支付密码不能为空。";
var password_shorter = "- 登录密码不能少于 6 个字符。";
var confirm_password_invalid = "- 两次输入密码不一致";
var email_empty = "- Email 为空";
var email_invalid = "- Email 不是合法的地址";
var agreement = "- 您没有接受协议";
var msn_invalid = "- msn地址不是一个有效的邮件地址";
var qq_invalid = "- QQ号码不是一个有效的号码";
var home_phone_invalid = "- 家庭电话不是一个有效号码";
var office_phone_invalid = "- 办公电话不是一个有效号码";
var mobile_phone_invalid = "- 手机号码不是一个有效号码";
var msg_un_blank = "* 用户名不能为空";
var msg_un_length = "* 用户名最长不得超过7个汉字";
var msg_un_format = "* 用户名含有非法字符";
var msg_un_registered = "* 用户名已经存在,请重新输入";
var msg_can_rg = "<font color=blue>可以注册</font>";

var msg_blank = "不能为空";
var no_select_question = "- 您没有完成密码提示问题的操作";
var passwd_balnk = "- 密码中不能包含空格";
var username_exist = "用户名 %s 已经存在";
var valicode_empty = "- 验证码不能为空";
var old_password_empty = "- 旧密码不能为空";
var new_password_empty = '- 新密码不能为空';
var confirm_password_empty = '- 两次密码不一样';
var new_password_length = '- 新密码长度不能小于6位';
var birthday_error = "- 生日日期不正确";;
var realname_empty = "- 姓名不能为空";
var address_empty = "- 用户地址不能为空";
var title_empty = "- 标题不能为空";
var content_empty = "- 内容不能为空";
var title_limit = "- 标题不能大于200字";
var surplus_amount_empty = "- 请输入您要操作的金额数量！";
var surplus_amount_error = "- 您输入的金额数量格式不正确！";
var process_desc = "- 请输入您此次操作的备注信息！";
var pay_empty = "- 请选择支付方式！";
var price_invalid = "- 团购价格不正确";
var account_invalid = "- 市场价格不正确";
var amount_invalid = "- 数量不正确";
var endtime_invalid = "- 时间不正确";
var alipay_empty = "- 支付宝账号不能为空";
var valicode_empty = "- 验证码不能为空";

var school_empty = "- 大学不能为空";
var start_university_empty = "- 大学入学年份不能为空";
var middle_school_empty = "- 高中不能为空";
var start_middle_school_empty = "- 高中入学年份不能为空";