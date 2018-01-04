//var o_chat_content={
//	s_default:"文明聊天，共创优良聊天环境，如有问题咨询在线客服~",
//	fn_append:function(s_father,s_child){
//		var o_father = document.getElementById(s_father);
//		var o_child = document.getElementById(s_child);
//		o_father.appendChild(o_child);
//	}
//}
//
//
function fn_add_emoji(s_src){
	var editText = document.getElementById("editText");
	var o_img = document.createElement("img");
	o_img.src=s_src;
	editText.appendChild(o_img);
}
//
//
//
//function fn_publish(){
//	var editText = document.getElementById("editText");
//	editText.onchange=function(){
//		var txtContent = editText.innerHTML.lenght;
//		if(txtContent>200){
//		}
//	}
//}
//
//
