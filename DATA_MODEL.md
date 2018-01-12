



## 发送信息/数据返回

	发 ['type'=>'','data'=>[]]
	返回 ['type'=>'','errCode' => 0 , 'info' => '发送成功/失败','data'=>[]]


> 手机验证  code

	[
		'phone' => 
	]

> 注册  register

	[
		'username'
		'password'
		'repeat-password'
		'code'
	]

	[
		'user_id'
		'username'
		'token'
	]

> 用户信息完善  userinfo

	[
		'email'
		'wechat'
		'qq'
		'age'
		'gender'
	]
	
		

> 登陆	login		

	[
		'username'
		'password'
	]
	[
		'user_id'
		'username'
		'token'
	]

> 发送消息	send

	[
		'room_id'
		'user_id'
		'message'
	]
	[   // 消息发送方和收取方都会 收到
		'room_id'
		'user_id'
		'message'
		'from' : [
			'username'
			'userid'
		]
	]

> 退出登陆  logout


> 重新连接 恢复登录状态  restore
	
	[
		'token'
	]
	[
		'user_id'
		'username'
		'token'
	]

> 获取用户列表  onlineaccount

	[		
	]
	{	# client_id : {user-session}
		"7f00000108ff00000002":{"username":"admin","user_id":3,"room_id":1},
		"7f00000108ff00000003":{"username":"lester","user_id":14,"room_id":1},
		"7f00000108ff00000004":{"room_id":1},		// 游客
		"7f00000108ff00000005":{"room_id":1}		// 游客
	}
	
> 切换房间  changeroom

	[
		'room_id'
	]
	[	
	]


## 推送消息(前端被动接收)  

>  新用户上线 通知同房间其他用户

	[type=>'online',errorCode=>0,'info'=>'','data'=>['username'=>'',user_id=>,'room_id'=>]]
	
> 用户下线 通知同房间的所有用户 

	[type=>'unonline',errorCode=>0,'info'=>'','data'=>['username'=>'',user_id=>,'room_id'=>]]
	
> 用户断开 通知同房间的所有用户
    
    *有两种情况: 用户已登录 和用户未登录  *

        [type=>'close',errorCode=>0,'info'=>'','data'=>['username'=>'',user_id=>,'room_id'=>]]
        [type=>'close',errorCode=>0,'info'=>'','data'=>['room_id'=>]]

> 聊天消息 得到回复后才发送成功

	[type=>'',data=>['room_id' => , 'user_id'=> , message=>]]

> 心跳包 用于检测链接是否存在

*需要回复 如果长时间不回复 服务端会断开链接*

	['type'=>'ping']

	['type'=>'ping', 'status'=>1]



	
## 获取视频列表
	
> 参数、 图片、分页等以后确定

GET http://192.168.40.158:55151/video.php

	{
		"errCode": "0",
		"info": "",
		"data": [{
			视频ID "id": "4620",
			视频名称 "name": "Googirl",
			无用 "video": "http:\/\/video-hw.xvideos-cdn.com\/videos\/3gp\/a\/4\/a\/xvideos.com_a4af9cf361f79d5ce9c8e6e0950ce29a-1.mp4?e=1513442468&ri=1024&rs=85&h=7f6efd51a6d99cbb9348ba83ce0992b9",
			视频时长 "duration": "13 min",
			文件地址 "file": "http:\/\/dev.sex.com\/download\/2017-12-16\/bedc83f5b686a13ba8ec0f45dda1c068.mp4",
			视频分类 "cate": "1"
		}, 
	
		......
	
		{
			"id": "4611",
			"name": "Keito Miyazawa sucks dong and gets cum in sex",
			"video": "http:\/\/video-hw.xvideos-cdn.com\/videos\/3gp\/1\/b\/c\/xvideos.com_1bc031acc1abdc2e128f9fb17fa223f7-1.mp4?e=1513441584&ri=1024&rs=85&h=e9d9082bbf0fdce68cc5005a8678921e",
			"duration": "10 min",
			"file": "download\/2017-12-16\/a3cbe78a8eed6be92274b45cd21406a2.mp4",
			"cate": "1"
		}]
	}

	请求失败时
	['errCode'=>'1','info'=>'数据请求失败','data'=>$e->getMessage()]
	