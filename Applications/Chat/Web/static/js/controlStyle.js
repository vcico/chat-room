/*****************************************
 * 此文件用于调整页面元素显示的尺寸，以适应屏幕尺寸
 */

//页面元素尺寸调整
function fnInitail(){
	var n_w_width = $(window).width();
	var n_w_heihgt = $(window).height();
	
	$("#registerForm").css({"left":(n_w_width-$("#registerForm").width())/2+"px"},{"top":(n_w_heihgt-$("#registerForm").height())/3+"px"});
	
	$("#message").css({"height":n_w_heihgt-$("#statment").height()-$("#editMessage").height()-110+"px"});
	
	$("#vip-container").css({"height":n_w_heihgt-185+"px"});
	
	$("#chatting").css({"width":n_w_width-695+"px"});
	
	$("#vedioContent").css({"height":n_w_heihgt-325+"px"});
	
	$("#alert-remind").css({"left":(n_w_width-$("#alert-remind").width())/2+"px"},{"top":(n_w_heihgt-$("#alert-remind").height())/3+"px"});
	
//	$("#message-show").css({"min-height":n_w_heihgt-$("#statment").height()-$("#editMessage").height()-105+"px"})
	

}
fnInitail();

//会员列表和私聊管理切换
function fnTab(){
	$("#vip-online").click(function(){
		$(this).removeClass("whiteBk").addClass("whiteDisabledBk").next().removeClass("whiteDisabledBk").addClass("whiteBk"); 
		$("#vip-box").show().next().hide();
	});
	$("#chat-admin").click(function(){
		$(this).removeClass("whiteBk").addClass("whiteDisabledBk").prev().removeClass("whiteDisabledBk").addClass("whiteBk");
		$("#private-chat").show().prev().hide();
	});
}
fnTab();


// 注册登录显示和隐藏
function fnSH(){
	$("#wrap_register").click(function(){
		$("#registerPage").hide();
	});
	$("#register").click(function(){
		
		$("#registerPage").show();
		$("#register-bar").addClass("form-active").siblings().removeClass("form-active");
		$("#form-register").show().siblings().hide();
		$("#line-bottom").css({"left":"247px"});
	});
	$("#login").click(function(){
		$("#check-bar").addClass("form-active").siblings().removeClass("form-active");
		$("#line-bottom").css({"left":"62px"});
		$("#registerPage").show();
		$("#form-login").show().siblings().hide();
	});
	$("#check-bar").click(function(){
		$(this).addClass("form-active").siblings().removeClass("form-active");
		$("#line-bottom").css({"left":"62px"});
		$("#form-login").show().siblings().hide();
	});
	$("#register-bar").click(function(){
		$(this).addClass("form-active").siblings().removeClass("form-active");
		$("#line-bottom").css({"left":"247px"});
		$("#form-register").show().siblings().hide();
	});
	
	
	$("#closeForm").click(function(){
		$("#registerPage").hide();
	});
	$("#alert-close").click(function(){
		$("#alert-remind").hide();
	})
	$("check-bar").click(function(){
		$("#alert-remind").hide();
	})
//	$(".room").click(function(){
//		$(this).addClass("active").siblings().removeClass("active");
//	})
	$("#private-mark").click(function(){
		fn_private_sh();
	})
}
fnSH();


//活动栏目tab切换
function fnTabAc(number){
//	var obj = document.getElementById("content"+number);
	$("#actives"+number).removeClass("tsnSixBk").addClass("orangeBk").siblings().removeClass("orangeBk").addClass("tsnSixBk");
	$("#content"+number).show().siblings().hide();
}

function fn_private_sh(){
	if($("#message-private").is(":hidden")){
			$("#message-private").show();
		}else{
			$("#message-private").hide();
		}
}
function stopBubble(e){ 
//如果提供了事件对象，则这是一个非IE浏览器 
if ( e && e.stopPropagation ) 
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
else
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
}
function stopDefault(e){ 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else
        window.event.returnValue = false; 
    return false; 
}
function fn_private(e){
	$("#message-private").show();
	var e = e || window.event;
	stopBubble(e);
	stopDefault(e);

	var this_name = e.target.innerHTML;
	var this_id = e.target.parentNode.getAttribute("id");
	var o_speakerB = document.getElementById("speakerB");
	o_speakerB.innerHTML = this_name;
	o_speakerB.title = this_id;
}


//onresize="onresize="fnInitail()"";

//
//$(window).resize(function(){
//	fnInitail();
//})
