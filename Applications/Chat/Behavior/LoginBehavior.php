<?php

namespace Chat\Behavior;

use container;
use GatewayWorker\Lib\Gateway;

/**
 * 登录处理类
 * ===========errorCode==============
 * 	0 成功 无错误
 *  1 参数错误 (包括账号密码错误)
 */
class LoginBehavior extends BaseBehavoir
{

	private $userinfo;

	/**
	 * 根据用户名获取用户信息
	 * @param string $username  用户名
	 */
	public static function getUserinfo($username)
	{
		return container::$mysql->select('*')->from('user')->where('username=:name')->bindValues(['name'=>$username])->row();
		// return (boolean)container::$mysql->select('count(userid) as exist')->from('user')
		// ->where('username=:name AND password=:pswd')->bindValues(['name'=>$username,'pswd'=>container::generatePasswordHash($password)])->single();
	}
	
	public function rules()
	{
		return [
			[['username','password'],'required'],
			['username',function($data,$rule){
				$this->userinfo = self::getUserinfo($data['username']);
				return empty($this->userinfo)?false:true;
			},'errorMsg'=>'用户名不存在'],
			['password',function($data,$rule){ 
				// 如果 用户名不存在 则忽略此检查(也就是当做成功处理)
				return empty($this->userinfo) || $this->userinfo['password'] == container::generatePasswordHash($data['password']) ;
			},'errorMsg'=>'用户密码错误'],
		];
	}

	public function run($client_id,$message)
	{
		$data = $message['data'];
		if(!container::$validator->validate($this->rules(),$data))
		{
			$msg = container::encodeMessage($message['type'],container::$validator->errors,1,'参数错误！');
		}else{
			$msg = container::encodeMessage($message['type'],['username'=>$this->userinfo['username'],'user_id'=>$this->userinfo['userid']]);
			Gateway::setSession($client_id, ['username'=>$this->userinfo['username'],'user_id'=>$this->userinfo['userid']]);
		}
		Gateway::sendToCurrentClient($msg);
	}

}
