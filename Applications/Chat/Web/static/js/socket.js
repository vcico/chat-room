//socket


//重新启动socket
function fn_restart_socket(){
//	setTimeout(fnSocket(),300);
}

//发送心跳包


//创建websocket




function fnSocket(){
	 if ("WebSocket" in window)
            {
               console.log("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
               var ws = new WebSocket("ws://123.207.167.163:9010/ajaxchattest");
                
               ws.onopen = function(evt)
               {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                    ws.send("发送数据");
                    
                   
                    
                    
                  	
//                $("#publishText").click(function(){
//                		var s_publish_data = {"type":"send","data":"{'room_id':'','usr_id':'','message':''}"};
//						
//                })

               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert(received_msg);
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
//                alert("连接已关闭..."); 	
					console.log("关闭次数+1");
                  
//                setTimeout(fnSocket(),300);
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
}
