//localStorage变量记录

//--visitor | 游客5648   --------- 游客账户

//--username | password  -----------VIP账户

//--room_id ---房间号
//--user_id ---用户ID
//--user_name ---用户名
//--token ---token


function fn_add_emoji(s_src){
	var editText = document.getElementById("editText");
	var o_img = document.createElement("img");
	o_img.src=s_src;
	editText.appendChild(o_img);
}


var s_message_record = "";
var a_user = [];

var o_user={
	
	s_visitor:"visitor",//游客的用户名键
	sVisitorPw:"visitor",//游客的用户名值
	
	sUsr:"username",//Vip的用户名键
	sPw:"password",//Vip密码键
	
	room_id:"",
	user_id:"",   //用户id
	user_name:"",
	token:"",  //
	read:function(key){
		return localStorage.getItem(key);
	},
	set:function(key,value){
		return localStorage.setItem(key,value);
	}
}


function fnReturnNumber(){//返回一串随机数
	 return Math.floor(Math.random()*1000000+1000);
}



function fnCheckin(ws){//进入登录状态

	var s_token = o_user.read("token");
	
	if(s_token!=null && s_token.length==32){//判断token
		
		//执行token登录
		console.log("客户端--发送了token！");
		
		var data = {"type":"restore","data":{"token":s_token}};
		
		ws.send(JSON.stringify(data));
		
		
	}else if(o_user.read("user_name")!=null && o_user.read("password")!=null){
		
		//vip本地信息登录
		
		console.log("客户端--发送了本地密码!");
		
		var name= o_user.read("username");
		
		var passwd = o_user.read("password");
		
		var data = {"type":"login","data":{"username":name,"password":passwd}};
			
	}else{
		
		//生成游客信息
//		
//		if(o_user.read("visitor")!=null && o_user.read("visitor").length>4){
//			
//		}else{
//			
//			console.log("生成了本地游客信息!");
//			
//			var s_number = fnReturnNumber();
//			var s_vname = "游客"+ s_number;
//			o_user.set("visitor",s_vname);
//			console.log("游客账户是"+o_user.read("visitor"));
//			
//		}
	}
}




function fn_new_scoket(){
	if ("WebSocket" in window){
		return new WebSocket('ws://192.168.40.158:7272');
	}else{
		return false;
	}
}


window.onload=function(){
	
	fn_innitail();
	
}




/*--------------------------
 *  被动行为 
 ----------------------------*/
//token返回信息
function fn_restore_bk(evt){
	
	o_user.set("permit","1");
	console.log("服务器--发出了恢复链接信息，已经登陆");
	console.log(evt);
	
	o_user.set("user_id",evt.data.user_id);
	
	o_user.set("user_name",evt.data.username);
	
	o_user.set("token",evt.data.token);
	if(evt.data.level=="admin"){
		o_user.set("level","admin");
		$("#movies").show();
	}
	$("#login").hide(); 
	$("#register").hide();
	$("#logout").show();
	$("#my_account").show().html(o_user.read("user_name"));

}

//新加入用户
function fn_online_bk(evt){
	
	console.log("服务器--发出新上线用户信息！");

	var o_viplist = document.getElementById('vip-box');	
	
	console.log(evt);

	fn_add_user(evt.data,o_viplist,"vip");

	//刷新在线人数
	var user_number = $("#vip-box li").length;
	document.getElementById("vip-online").innerHTML="在线会员("+user_number+")";
	
	
}

//用户下线
function fn_unonline_bk(evt){
	
	console.log(evt);
	console.log("下线用户提醒");
	console.log(evt.data.user_id);
//	var o_user_list = document.getElementById("vip-box");
//	var o_user_id  = o_user_list.getElementById(evt.data.user_id);
//
//	
//	if(typeof(evt.data.user_id) != "undefined" && typeof(o_user_id)!="undefined"){
//		
//		o_user_list.removeChild(o_user_id);    
//		
//		for(x in a_user){
//			if(evt.data.user_id == a_user[x]){
//				a_user=a_user.slice(x+1);
//			}
//		}
//		
//	}
	for(x in a_user){
		if(evt.data.user_id == a_user[x]){
			a_user=a_user.slice(x+1);
			
			var o_user_list = document.getElementById("vip-box");
			var o_user_id  = document.getElementById(evt.data.user_id);
			o_user_list.removeChild(o_user_id);    
			
		}
	}
	
	
	var user_number = $("#vip-box li").length;
	document.getElementById("vip-online").innerHTML="在线会员("+user_number+")";
	
}


//接受心跳-回应
function fn_ping_bk(o_result,ws){
	
	console.log("服务器--返回了心跳包！"); 
	console.log(o_result);
	
	
	var data = {"type":"ping","status":1};
	ws.send(JSON.stringify(data));
	
	console.log(data);
	
}

//注册返回信息
function fn_register_bk(evt){
	
	console.log("服务器--返回了注册信息！");
	
	o_user.set("user_id",evt.data.user_id);
	
	o_user.set("user_name",evt.data.username);
	
	o_user.set("token",evt.data.token);
	
	console.log("你注册并登录了账号:"+"user_id:"+o_user.read("user_id")+"user_name:"+o_user.read("user_name")+"token:"+o_user.read("token"));
	if(evt.data.level=="admin"){
		o_user.set("level","admin");
		$("#movies").show();
	}
	$("#login").hide(); 
	$("#register").hide(); // ----隐藏登录注册按钮
	$("#logout").show();
	$("#my_account").show().html(o_user.read("user_name"));
	o_user.set("permit","1");  // ---允许发言
	
	$("#registerPage").hide();
	
}

//返回登录信息
function fn_login_bk(evt){
	
	console.log("服务器--返回了登录信息！");
	console.log(evt);
	
	o_user.set("user_id",evt.data.user_id);
	
	o_user.set("user_name",evt.data.username);
	
	o_user.set("token",evt.data.token);
	
	console.log("你登录了账号:"+"user_id:"+o_user.read("user_id")+"user_name:"+o_user.read("user_name")+"token:"+o_user.read("token"));
	
	$("#login").hide(); 
	$("#register").hide(); 
	
	$("#logout").show();
	$("#my_account").show().html(o_user.read("user_name"));
	// ----隐藏登录注册按钮
	if(evt.data.level=="admin"){
		o_user.set("level","admin");
		$("#movies").show();
	}
	
	o_user.set("permit","1");  // ---允许发言
	
	
	$("#registerPage").hide();
	
	for(x in a_user){
		if(evt.data.user_id == a_user[x]){
			a_user=a_user.slice(x+1);
			
			var o_user_list = document.getElementById("vip-box");
			var o_user_id  = document.getElementById(evt.data.user_id);
			o_user_list.removeChild(o_user_id);    
			
		}
	}
	
	
	
	
	var user_number = $("#vip-box li").length;
	document.getElementById("vip-online").innerHTML="在线会员("+user_number+")";
}

//返回用户列表
function fn_users_bk(evt){
	
	console.log("服务器--返回了用户列表");

	var o_viplist = document.getElementById('vip-box');	
	
	o_viplist.innerHTML= "";
	console.log(evt);

	for(x in evt.data){
		
		fn_add_user(evt.data[x],o_viplist,"vip");
		
	}
	//刷新在线人数
	var user_number = $("#vip-box li").length;
	document.getElementById("vip-online").innerHTML="在线会员("+user_number+")";
}


function fn_cImg(s_classname,s_src){
	var o_img = document.createElement("img");
	o_img.className=s_classname;
	o_img.src=s_src;
	return o_img;
}


function fn_remove(obj){
//	var o_message_show = document.getElementById("message-show");
	var a_message_li = obj.getElementsByTagName('li');
	for(var i = 0;i<20;i++){
		obj.removeChild(a_message_li[i]);
	}
}

//返回消息
function fn_send_bk(o_message_show,evt){


	console.log("服务器--返回了消息！");
	console.log(evt);
	
	if(evt.data.user_id=="" || evt.data.user_id==null){//群聊
	
//		var a = $("#message-show li").length;
//		if(a>50){
//			var o_messages = document.getElementById("message-show");
//			fn_remove(o_messages);
//		}
		
		if(evt.data.from.username=="admin"){
			var date = new Date();
		 
			var o_message_model = o_message_show.getElementsByTagName("li")[0];
			
			var o_message_li = o_message_model.cloneNode(true);
			
			var o_message_time = o_message_li.getElementsByClassName("recordTime")[0];
			
			o_message_time.innerHTML = (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
			
//			o_message_li.getElementsByClassName("vest")[0].src="public/images/person/vip.png";
			
			var o_vest_father = o_message_li.getElementsByClassName("usrPic")[0];         
			var o_vest = o_message_li.getElementsByClassName("vest")[0];
			
			o_vest_father.removeChild(o_vest);
			
			o_message_li.getElementsByClassName("avatar")[0].src="public/images/person/sys.png";
			
			var o_message_username = o_message_li.getElementsByClassName("usrName")[0];
			o_message_username.innerHTML = evt.data.from.username;
			console.log(evt);
			
			
			var o_message_word = o_message_li.getElementsByClassName("usraim")[0];
			o_message_word.innerHTML = evt.data.message;
			$(o_message_word).removeClass("usrWords").addClass("usrWordx");
			
			
			o_message_show.appendChild(o_message_li);
			
			
		}else{
			
			var date = new Date();
		 
			var o_message_model = o_message_show.getElementsByTagName("li")[0];
			
			var o_message_li = o_message_model.cloneNode(true);
			
			var o_message_time = o_message_li.getElementsByClassName("recordTime")[0];
			
			o_message_time.innerHTML = (date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
			
			o_message_li.getElementsByClassName("vest")[0].src="public/images/person/vip.png";
			
			
			var o_message_username = o_message_li.getElementsByClassName("usrName")[0];
			o_message_username.innerHTML = evt.data.from.username;
			console.log(evt);
			
			
			var o_message_word = o_message_li.getElementsByClassName("usrWords")[0];
			o_message_word.innerHTML = evt.data.message;
			
			o_message_show.appendChild(o_message_li);
			
			
		}
		
		$("#message-roll").css({"height":$("#message").height()*$("#message").height()/$("#message-show").height()+"px"});
		$("#message-roll").css({"top":$("#message").height()-$("#message-roll").height()+"px"});
		$("#message-show").css({"top":-$("#message-show").height()+$("#message").height()-10+"px"});		
		
//		$('#message').scrollTop( $('#message-show')[0].scrollHeight);
		

	}else{//私聊
		
		var a = $("#message-show>li");
		if(a.length>30){
			var o_messages = document.getElementById("private-list");
			console.log("准备调用私聊移除程序！");
			fn_remove(o_messages);
		}
		
		$("#message-private").show();
		var o_list = document.getElementById("private-list");
		
		if(evt.data.from.user_id != o_user.read("user_id")){//自己发的消息
			
			var o_li = document.createElement("li");
			
			o_li.className="left-user private-session";
			
			o_list.appendChild(o_li);
			
			var o_p_first  = document.createElement("p");
			
			o_li.appendChild(o_p_first);
			
			var o_label = document.createElement("label");
			
			o_label.innerHTML = evt.data.from.username;
			
			o_p_first.appendChild(o_label);
			
			var o_p_seconed = document.createElement("p");
			
			o_li.appendChild(o_p_seconed);
			
			o_p_seconed.className="private-content";
			
			o_p_seconed.innerHTML = evt.data.message;
			
			
		}else{//私聊--别人发的消息
			
			var o_list = document.getElementById("private-list");
			
			var o_li = document.createElement("li");
			
			o_li.className="right-user private-session";
			
			o_list.appendChild(o_li);
			
			var o_p_first  = document.createElement("p");
			
			o_li.appendChild(o_p_first);
			
			var o_label = document.createElement("label");
			
			o_label.innerHTML = evt.data.from.username;
			
			o_p_first.appendChild(o_label);
			
			var o_p_seconed = document.createElement("p");
			
			o_li.appendChild(o_p_seconed);
			
			o_p_seconed.className="private-content";
			
			o_p_seconed.innerHTML = evt.data.message;
			
			
		}
			$("#private-roll").css({"height":$("#private-talk").height()*$("#private-talk").height()/$("#private-list").height()+"px"});
			$("#private-roll").css({"top":$("#private-talk").height()-$("#private-roll").height()+"px"});
			$("#private-list").css({"top":-$("#private-list").height()+$("#private-talk").height()+"px"});
	}
	
	
}







/*--------------------------
 *  主动行为 
 ----------------------------*/

//2--token恢复登录
//function fn_restore_bk(ws){
	
//	var s_token = o_user.read(o_user.token);
//	
//	if(s_token!=null && s_token.length==32){//判断token
//		
//	 	console.log("客户端--发送了token登录信息");
//		//执行token登录
//		var data = {"type":"restore","data":{"token":s_token}};
//		
//		
//		ws.send(JSON.stringify(data));
//		
//		
//		
//	}
//	console.log("服务器--返回了token登录情况！");
//
//
//}




//3--获取用户列表
function fn_users(ws){
	
	a_user = [];
	console.log("客户端--请求用户列表");
	var vip_box = document.getElementById("vip-box");
	vip_box.innerHTML = "";
	var data = {"type":"onlineaccount","data":""};
	ws.send(JSON.stringify(data));
	
}

//4--登录
function fn_login(ws){
	// console.log($('#register-box').serializeArray());
	var name = $('#form-login input[name="username"]').val(),
		password = $('#form-login input[name="password"]').val();
		
		if(name.length>1 && name.length<9){
			
			if(password.length>5 && password.length<17){
				
				console.log("客户端--发送登录请求！");
				
				//存储到localstorage
				o_user.set("user_name",name);
				o_user.set("password",password);
				console.log("name:"+name+"    password:"+password);
				var data = {"type":"login","data":{"username":name,"password":password}};
				ws.send(JSON.stringify(data));
				console.log(data);
				console.log(ws);
				
			}else{
				
				fnRemind(oRemind.s_chekin);
				//弹窗--密码错误\n
			}
			
		}else{
			
			fnRemind(oRemind.s_chekin);
			//弹窗--用户名输入错误
		}
}

//5--注册
function fn_register(ws){
	// console.log($('#register-box').serializeArray());
	var name = $('#form-register input[name="username"]').val(),
		password =	$('#form-register input[name="password"]').val(),
		repeat_pswd =  $('#form-register input[name="repeat-password"]').val();
	
	if(name.length>1 && name.length<9){	//判断用户名长度合法性
		
		if(password.length>5 && password.length<17){ //判断密码合法性

			if(password==repeat_pswd){
				
				console.log("客户端--发送注册信息！");
				var data = {"type":"register","data":{"username":name,"password":password}};
				
				//存储账号密码
				o_user.set("user_name",name);
				o_user.set("password",password);
				
				ws.send(JSON.stringify(data));
				
			}else{
				
				fnRemind(oRemind.s_register_same);
				console.log("客户端--注册密码不相同！");
				
			}
			
		}else{
			
			fnRemind(oRemind.s_register_password);
			//弹窗--密码长度不合法
			console.log("客户端--注册密码长度不合法！");
		}
		
		
	}else{
		
		fnRemind(oRemind.s_register_username);
		//弹窗--用户名输入不合法
		alert("客户端--注册用户名输入不合法！");
		
	}
}

//6--发消息
function fn_send_public(ws){
	
	
	if(o_user.read("permit")>0){
		
		
		console.log("客户端--发送聊天消息!");

		var msg = $("#editText").html();
		var removes = msg.replace(/\s+/g,'');
		var results = removes.replace(/&nbsp;/gi,'');
		console.log(msg);
		if(results=="" || msg=="" || msg==s_message_record){
			
			console.log("不能发送重复或为空的消息。");
			
			fnRemind(oRemind.s_FNR);
			
		}else{
			
			s_message_record = msg;
	
			var data  = {"type":"send","data":{"room_id":o_user.read("room_id"),"user_id":"","message":msg}};
			
			console.log(data);
			ws.send(JSON.stringify(data)); 
			
			$("#editText").html("");
			
		}
		
	}else{
		console.log("需要登录才能发送消息哦？");
		
		fnRemind(oRemind.sNoSpeak);
		
	}
	
}

function fn_send_private(ws){
	
	if(o_user.read("permit")>0){
		
		console.log("客户端--发送聊天消息!");

		var msg = $("#private-message").val();
		var removes = msg.replace(/\s+/g,'');
		var results = removes.replace(/&nbsp;/gi,'');
		
		if(results=="" || msg=="" || msg==s_message_record){
			
			console.log("不能发送重复或为空的消息。");
			
			fnRemind(oRemind.s_FNR);
			
		}else{
			
			s_message_record = msg;
			
			var o_speaker = document.getElementById("speakerB");
			
			var data  = {"type":"send","data":{"room_id":o_user.read("room_id"),"user_id":o_speaker.title,"message":msg}};
			
			ws.send(JSON.stringify(data)); 
			
			$("#private-message").val("");
			
		}
		
	}else{
		
		fnRemind(oRemind.sNoSpeak);
		console.log("需要登录才能发送消息哦？");
	}
	
}

/*--------------------------
 * 7-- 错误行处理
 ----------------------------*/
//token错误
function fn_restore_err(ws){
	
	fn_name_password(ws);
	
}
function fn_name_password(ws){
	
	if(o_user.read("user_name")!=null && o_user.read("password")!=null){
		
		//vip本地信息登录
		
		console.log("客户端--发送了本地账号密码!");
		
		var name= o_user.read("user_name");
		var passwd = o_user.read("password");
		
		var data = {"type":"login","data":{"username":name,"password":passwd}};
		ws.send(JSON.stringify(data));

		
	}else{
		
		fn_visitor(ws);
		
	}
}
function fn_log_err(ws){
	fnRemind(oRemind.s_chekin);
}
/*--------------------------
 *  错误处理 
 ----------------------------*/



//8--添加用户
function fn_refresh_user(data,o_viplist,parameter){
	
//	parameter--visitor | vip | manager
	if(typeof(data.username)=="undefined"){
		return false;
	}

	var count = 0;
	
	for(x in a_user){
		if(a_user[x]==data.user_id){
			count++;
		}
	}
	
	if(count==0){
		
		var o_vip_li = document.createElement("li");	
			o_vip_li.id=data.user_id;
			o_viplist.appendChild(o_vip_li);
			
			a_user.unshift(data.user_id);
			
			var img_head = document.createElement('img');
			img_head.className="usr_avatar";
			img_head.src = "public/images/person/null.jpg";
			o_vip_li.appendChild(img_head);
			
			var user_name = document.createElement('span');
			user_name.innerHTML = data.username;
			user_name.onclick=function(e){
				fn_private(e);
			};
			user_name.className = "usr_name whiteColor";
			o_vip_li.appendChild(user_name);
			
			var img_mark = document.createElement('img');
			img_mark.className = "usr_vest";
			img_mark.src= "public/images/person/"+parameter+".png";
			o_vip_li.appendChild(img_mark);
	}

		
		
}

/*-------------------------
 * Functions
 ------------------------*/

//8--添加用户
function fn_add_user(data,o_viplist,parameter){
	
//	parameter--visitor | vip | manager
	if(typeof(data.username)=="undefined" || o_user.read("user_id")==data.user_id){
		return false;
	}

	var count = 0;
	
	for(x in a_user){
		if(a_user[x]==data.user_id){
			count++;
		}
	}
	
	if(count==0){
		
		var o_vip_li = document.createElement("li");	
			o_vip_li.id=data.user_id;
			o_viplist.appendChild(o_vip_li);
			
			a_user.unshift(data.user_id);
			
			var img_head = document.createElement('img');
			img_head.className="usr_avatar";
			img_head.src = "public/images/person/null.jpg";
			o_vip_li.appendChild(img_head);
			
			var user_name = document.createElement('span');
			user_name.innerHTML = data.username;
			user_name.onclick=function(e){
				fn_private(e);
			};
			user_name.className = "usr_name whiteColor";
			o_vip_li.appendChild(user_name);
			
			var img_mark = document.createElement('img');
			img_mark.className = "usr_vest";
			img_mark.src= "public/images/person/"+parameter+".png";
			o_vip_li.appendChild(img_mark);
	}
	
	$("#vip-roll").css({"height":$("#vip-list").height()*$("#vip-list").height()/$("#vip-box").height()+"px"});
		$("#vip-roll").css({"top":$("#vip-scroll").height()-$("#vip-roll").height()+"px"});
		$("#vip-box").css({"top":-$("#vip-box").height()+$("#vip-list").height()+"px"});

}











var ws;
function fn_innitail(){
	ws = fn_new_scoket();
	
	o_user.set("room_id",1);
	$("#movies").hide();
	localStorage.removeItem("level");
	var o_message_show = document.getElementById("message-show");
	
	ws.onopen = function(evt) {
		
	  	console.log('Connection open ...');
	  	
		fnCheckin(ws);//token恢复--会员登录--生成游客信息
		
		fn_users(ws);//获取用户列表
			
	};
	
	ws.onerror=function(evt){
		console.log(evt.data);
		ws.close();
	}
	
	$('#login-btn').click(function(){
		fn_login(ws);
	});
	
	$('#register-btn').click(function(){
		fn_register(ws);
	});
	$('#send-btn').click(function(){
		if(o_user.read("permit")==0){
			fnRemind(oRemind.sNoSpeak);
			return false;
		}
		console.log("用户--点击了发送消息按钮！");
		fn_send_public(ws);
	});
	
	$('#editText').bind('keydown',function(e){
		var theEvent = e || window.event;
		var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
		if(code == 13 && $("#editText").html()!=null){
		if(o_user.read("permit")==0){
			fnRemind(oRemind.sNoSpeak);
			return false;
		}
			fn_send_public(ws);
			event.returnValue = false;
  			return false;
		}
	});
	$("#private-message").bind('keydown',function(e){
		var theEvent = e || window.event;
		var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
		if(code == 13 && $("#editText").html()!=null){
			if(o_user.read("permit")==0){
				fnRemind(oRemind.sNoSpeak);
				return false;
			}
			var o_speakerB = document.getElementById("speakerB");
			if(o_speakerB.title == ""){
				
				fnRemind(oRemind.s_private_nochocie);
				
			}else{
				
				fn_send_private(ws);
				
			}
			theEvent.returnValue = false;
  			return false;
		}
	});
	$("#private-button").click(function(){
		var o_speakerB = document.getElementById("speakerB");
		
		if(o_user.read("permit")==0){
			fnRemind(oRemind.sNoSpeak);
			return false;
		}
		if(o_speakerB.title == ""){
			
			//提示未选择私聊对象
			
			fnRemind(oRemind.s_private_nochocie);
			
		}else{
			
			fn_send_private(ws);
			
		}
	});
	
	

	
	$("#logout").click(function(){
		
		localStorage.removeItem("password");
		localStorage.removeItem("permit");
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_name");
		localStorage.removeItem("visitor");
		localStorage.removeItem("level");
		
		var data = {"type":"logout","data":{}};
		ws.send(JSON.stringify(data));
		
		$("#movies").hide();
		$("#logout").hide();
		$("#my_account").hide().html("");
		$("#register").show();
		$("#login").show();
	});
	

	//接受数据
	ws.onmessage = function(evt) {
		
		var o_result = JSON.parse(evt.data);
		console.log(o_result);
		if(o_result.errCode==0){

			switch(o_result.type){
				case "online":
					fn_online_bk(o_result);
					break;
				case "onlineaccount":
					fn_users_bk(o_result);
					break;
				case "unonline":
					fn_unonline_bk(o_result);
					break;
				case "close":
					fn_unonline_bk(o_result);
					break;
				case "restore":
					fn_restore_bk(o_result);
					break;
				case "register":
					fn_register_bk(o_result);
					break;
				case "login":
					fn_login_bk(o_result);
					break;
				case "send":
					fn_send_bk(o_message_show,o_result);
					break;
				case "ping":
					fn_ping_bk(o_result,ws);
					break;
				default:
					console.log("服务器--发送未知类型数据是：");
					console.log(o_result);
			}
			
		}else{
			
			switch(o_result.type){
				case "register":
					console.log("restore出现错误：");
					break;
				case "restore":
					console.log("restore出现错误：");
					fn_restore_err(ws);
					break;
				case "login":
					console.log("login出现错误：");
					console.log(o_result);
					fn_log_err(ws);
					break;
				case "ping":
					console.log("ping出现错误：");
					break;
				default:
					console.log("服务器--发送未知类型数据是：");
			}
		}
	};
	
	
	ws.onclose = function(evt){
		
		//重新链接
		
		setTimeout(function(){
			
	        fn_innitail();
	         
	    },3000);
		
	};
}
