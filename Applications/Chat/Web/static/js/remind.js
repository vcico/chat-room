//本文件为页面各类限制和通知

var oRemind ={
	
//	游客行为
	//--没有发言权限
	sNoSpeak:"游客无法在聊天室发言,注册会员才能发言哦,赶紧领取会员,参与讨论吧!",
	
//	会员行为	
	//--限制输入字数
	sNumberLimited:"最多只能输入20个字符哦!",
	//隔5分钟提示注册会员
	sRegister:"您已在直播室收听5分钟，赶紧领取会员，点击上方注册会员或联系左上方QQ在线客服，即刻享受更多优质服务。",
	//提示密码错误
	sPasswdMiss:"您输入的用户名或者密码有误",

}


function fnRemind(type){
	
	//修改内容
	var content = document.getElementById("alert-content");
	content.innerHTML = type;
	
	var remind = document.getElementById("alert-remind");
	remind.style.display="block";
	
}

fnRemind(oRemind.sNoSpeak);