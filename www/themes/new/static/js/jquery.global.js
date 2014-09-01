$(document).ready(function(){
	$(".main-nav-son").hide();			   
	$(".main-nav li").hover(function(){
			$(this).children(".main-nav-son").show();
			$(this).children(".icon").toggleClass('icon-up');
		},function(){
			$(this).find(".main-nav-son").hide();
			$(this).children(".icon").toggleClass('icon-up');
		}
	);
	$(".account-nav-item-link").click(function(){
		var son = $(this).next(".account-nav-son");
		$(".nav-icon").removeClass("list");
		if(son.is(":hidden")){
			$(".account-nav-son").slideUp(300);
			$(this).children('.nav-icon').addClass('list');
			son.slideDown(300);			
		}
		else{
			$(".account-nav-son").slideUp(300);
		}			
	})
	$(".account-tab-item").click(function(){
		index = $(".account-tab-item").index($(this));	
		$(".account-tab-content").hide().eq(index).show();
		$(".account-tab-item").removeClass("current").find("a").removeClass("current");
		$(this).addClass("current").find("a").addClass("current");
	})
	$(".tips").hover(function(){
		$(this).next(".tips-shadow").show();						  
	},function(){
		$(this).next(".tips-shadow").hide();			
	})

	//在线客服
	var server = [
				  {"name":"琪琪", "qq":"100000"},
				  {"name":"薇薇", "qq":"100000"},
				  {"name":"若男", "qq":"100000"},
				  {"name":"木子", "qq":"100000"},
				  {"name":"艾米", "qq":"100000"}
				];
	var today = new Date();
	var num = 5;
	var today_server = server.slice(num);
	for(var i = 0;i<num;i++){
		today_server.push(server[i]);
	}

	var server_part_html = '';
	for(var index in today_server){
		var one = today_server[index];
		if(one.qq){
		server_part_html += '<div class="h30 w100"><span class="mr5"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+one.qq
				+'&site=qq&menu=yes">'+one.name+'</a></span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='
				+one.qq+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:'
				+one.qq+':46" alt="点击这里给我发消息" title="点击这里给我发消息"></a></div>'
		}
	}

	$(".server-main").html(server_part_html);
	$(".server-panel,.pg-footer-icon.online").on("click", function(){
		$(".server-panel").css("right", $(".server-panel").css("right")=="0px"?"142px":"0px");
		$(".server-main").toggle();
	});
	$(".server-panel").on("mouseenter", function(){
		$(".server-panel").css("right","142px");
		$(".server-main").show();
	});
	$(".server-center").on("mouseleave", function(){
		setTimeout(function(){
			$(".server-panel").css("right","0px");
			$(".server-main").hide();
		}, 1000);
	});



})



function addBookmark(){
    var title = document.title;
    var URL = document.URL;

    try {
        window.external.addFavorite(URL, title);          //ie
    } catch(e) {
        try {
              window.sidebar.addPanel(title, URL, "");     //firefox
        } catch(e) {
              alert("该浏览器不支持，请使用Ctrl+D进行添加");     //chrome opera safari
        }
    }
} 

