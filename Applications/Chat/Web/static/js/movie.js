/*-------------------------------
 *电影播放
 -----------------------------*/


//播放小电影
function fn_play(src){
	
	
	$("#movie-wrap").show();
	var my_video = document.getElementById("movie-content");

	my_video.src =src;
	my_video.load();
	my_video.play();
}

//关闭小电影
$("#movie-close").click(function(){
	$("#movie-wrap").hide();
	var my_video = document.getElementById("movie-content");
	my_video.src="";
});

//回掉生成电影列表
function callback(result){
	console.log(result);
var data = result.data;
var moviebar = document.getElementById('movie');

if(typeof(data)!="undefined" && o_user.read("level")=="admin"){
	
	console.log("数据正常！");
	
	for(x in data){
		
		var movie_li = document.createElement('li');
		
		//电影地址
		movie_li.title=data[x].file;
		
		movie_li.onclick=function(e){
			
				var src = this.title;
				var content = this.innerHTML;
				var editMessage = document.getElementById("editText");
				editMessage.innerHTML = '<li class="movie-word" title="'+src+'" onclick="fn_play(this.title);">【片名】:'+content+'<br />亲爱的用户朋友，最新的影片已经发布，还等什么，点击这里让我们一观岛国巨作吧!</li>';
				
		}
		
		movie_li.className="tsnBk movie-diliver";
	
		moviebar.appendChild(movie_li);
		
		
		
		//电影序列号
		var movie_rank = document.createElement('span');
		
		movie_rank.innerHTML = "NO." + (x);
		
		movie_rank.className="movie-rank";
		
		movie_li.appendChild(movie_rank);
		
		
		
		
		//电影名字
		var movie_name = document.createElement('span');
		
		movie_name.className = "movie-name";
		
		movie_name.innerHTML = data[x].name;
		
		movie_li.appendChild(movie_name);
		
		
		
		//电影时长
		var movie_time = document.createElement('span');
		
		movie_time.className = "movie-time";
		movie_time.innerHTML = data[x].duration ;
		
		movie_li.appendChild(movie_time);
 	}
}
	
}


