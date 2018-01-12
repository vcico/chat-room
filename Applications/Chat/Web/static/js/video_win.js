//开奖视频src路径调用  数据和方法
var oVideoLink = {
	bj:"https://www.1229.org/video/pk10/450.html",
	cq:"https://www.1229.org/mvideo/cqssc",
	js:"https://www.1229.org/mvideo/jsk3",
	fnTabVideo:function(sId,sSrc){
		var iframeWin = document.getElementById("iframeWin");
		iframeWin.src=sSrc;
		var objs = document.getElementById(sId);
		$(objs).addClass("orangeBk").siblings().removeClass("orangeBk");
	}
}
	