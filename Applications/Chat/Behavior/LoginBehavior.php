<?php

namespace Chat\Behavior;

use Container;
use Chat\Lib\User;
use GatewayWorker\Lib\Gateway;

/**
 * 登录处理类
 * ===========errorCode==============
 *  0 成功 无错误
 *  1 参数错误 (包括账号密码错误)
 */
class LoginBehavior extends BaseBehavior
{

	private $userinfo;

	
	public function rules()
	{
            return [
                [['username','password'],'required'],
                ['username',function($data,$rule){
                        $this->userinfo = User::getUserinfoByName($data['username']);
                        return empty($this->userinfo)?false:true;
                },'errorMsg'=>'用户名不存在'],
                ['password',function($data,$rule){ 
                        // 如果 用户名不存在 则忽略此检查(也就是当做成功处理)
                        return empty($this->userinfo) || $this->userinfo['password'] == User::generatePasswordHash($data['password']) ;
                },'errorMsg'=>'用户密码错误'],
            ];
	}

	public function run($client_id,$message)
	{
		$data = $message['data'];
		if(User::isLogin())  // 如果已登录  返回用户信息并返回(终止程序)
		{
                    Gateway::sendToCurrentClient(Container::encodeMessage($message['type'],['username'=>$this->userinfo['username'],'user_id'=>$this->userinfo['userid']]));
                    return true;
		}
		if(!Container::$validator->validate($this->rules(),$data)) {
                    $msg = Container::encodeMessage($message['type'],Container::$validator->errors,1,'参数错误！');
		}else{
                    $token = User::login($client_id, $this->userinfo);  // 登录操作
                    $msg = Container::encodeMessage($message['type'],['username'=>$this->userinfo['username'],'user_id'=>$this->userinfo['userid'],'token'=>$token]);
		}
		Gateway::sendToCurrentClient($msg);
	}

}
