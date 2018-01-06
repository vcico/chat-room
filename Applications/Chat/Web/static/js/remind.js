//本文件为页面各类限制和通知

var oRemind ={
	
//	游客行为
	//--没有发言权限
	sNoSpeak:"权限不足,游客无法在聊天室发言,注册会员才能发言哦,赶紧领取会员或者登录账号,参与讨论吧!",
	
//	会员行为	
	//--限制输入字数
	sNumberLimited:"最多只能输入20个字符哦!",
	//隔5分钟提示注册会员
	sRegister:"您已在直播室收听5分钟，赶紧领取会员，点击上方注册会员或联系左上方QQ在线客服，即刻享受更多优质服务。",
	//提示密码错误
	sPasswdMiss:"您输入的用户名或者密码有误",
	
	
	s_register_username:"请注意用户名的长度哦，用户名长度应该为2-10个字符！",
	s_register_password:"请注意密码的长度哦，密码长度为6-16个字符",
	s_register_same:"两次密码不通哟，请确认两次输入的密码一致!",
	
	s_chekin:"亲,您的用户名或密码输入错误!",
	
	s_private_nochocie:"开始私聊前，请先选择私聊对象哦!",
	
	s_FNR:"禁止发送空或者重复消息，空格也是不允许的哟!"
}


function fnRemind(type){
	
	//修改内容
	var content = document.getElementById("alert-content");
	content.innerHTML = type;
	
	var remind = document.getElementById("alert-remind");
	remind.style.display="block";
	
}
function fn_register_remind(type){
	
	
}

setInterval(function(){
	fnRemind(oRemind.sRegister);
},300000);




