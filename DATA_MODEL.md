



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


> 退出登陆  logout




		
	

## 推送消息(前端被动接收)  

> 聊天消息 得到回复后才发送成功

	[type=>'',data=>['room_id' => , 'user_id'=> , message=>]]

> 心跳包 用于检测链接是否存在

*需要回复 如果长时间不回复 服务端会断开链接*

	['type'=>'ping']

	['type'=>'ping', 'status'=>1]



	
