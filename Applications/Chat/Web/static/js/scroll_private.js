/*-------------------------------
 *滚动条播放
 -----------------------------*/

function stopDefault( e ){

    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}

function stopBubble(e){ 
//如果提供了事件对象，则这是一个非IE浏览器 
if(e&& e.stopPropagation ){
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
}
else {
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
   }
}



function getPos(e){
	return {x:e.clientX,y:e.clientY};
}



//滚动条传参
function scroll_encapsulation(){
	
	
	var o_outer1 = document.getElementById("message-scroll");  //框框
	
	var o_inner1 = document.getElementById("message-show");  //内容
	
	var o_scroll1 = document.getElementById("message-roll");  //滚动条
	
	scroll_rool(o_outer1,o_inner1,o_scroll1);
	
	
	
	var o_outer2 = document.getElementById("private-talk");  //框框
	
	var o_inner2 = document.getElementById("private-list");  //内容
	
	var o_scroll2 = document.getElementById("private-roll");  //滚动条
	
	scroll_rool(o_outer2,o_inner2,o_scroll2);
	
	

	var o_outer3 = document.getElementById("vip-list");  //框框
	
	var o_inner3 = document.getElementById("vip-box");  //内容
	
	var o_scroll3 = document.getElementById("vip-roll");  //滚动条
	
	scroll_rool(o_outer3,o_inner3,o_scroll3);
	

	
}

//滚动条
function scroll_rool(o_outer,o_inner,o_scroll){
	
	o_scroll.onmousedown=function(e){
	
	var e = e || window.event;
	var pos =getPos(e);
	var disy = pos.y-o_scroll.offsetTop;
	
	
	document.onmousemove=function(e){
		
		var e = e || window.event;
		
		var pos =getPos(e);

		var y= pos.y-disy;
		
		if(y<0){
			
			y=0;
			
		}else if(y>o_outer.offsetHeight-o_scroll.offsetHeight){
			
			y=o_outer.offsetHeight-o_scroll.offsetHeight;
		}

		o_scroll.style.top = y+"px";  //滚动条高度
		o_inner.style.top = -y*((o_inner.offsetHeight-o_outer.offsetHeight)/(o_outer.offsetHeight-o_scroll.offsetHeight))+"px";	//内容高度		

	};


	document.onmouseup=function(e){
		
		document.onmousemove=null;
		document.onmousedown=null;
		
	};
	
	return false;
}

}






//调用
scroll_encapsulation();