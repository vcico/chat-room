<?php


namespace Chat\Behavior;

use Container;
use Chat\Lib\User;
use Chat\Lib\Validators;
use \GatewayWorker\Lib\Gateway;
/**
 * 客户端发送信息
 * ==============errorCode==============
 * -1  未登录
 * -2  没有权限(不在该房间)
 * 1  数据验证失败
 * 
 */
class SendBehavior extends BaseBehavior
{
	
	/**
	 * @inheritdoc
	 */
	public function rules()
	{
	    return [
                [implode(Validators::DELIMITER, ['room_id','user_id']),'oneOf'],
                ['message','required'],
            ];
	}
	
	
	public function run($client_id,$message)
	{
		$data = $message['data'];
		if(!User::isLogin()) // 如果未登录  返回消息 退出
		{
                    Gateway::sendToCurrentClient(Container::encodeMessage($message['type'],$data,-1,'登录后才能聊天'));
                    return false;
		}
                if(!Container::$validator->validate($this->rules(), $data)){   // 如果数据验证失败
                    Gateway::sendToCurrentClient(Container::encodeMessage($message['type'], Container::$validator->errors,1,'数据验证失败'));
                    return false;
                }
		if($data['room_id']){
                    
                }elseif($data['user_id']){
                    
                }
                
//		echo  '这是一条消息',"\n";
//		$message['time'] = time();
//		Gateway::sendToCurrentClient(json_encode($message));
	}
	
}
