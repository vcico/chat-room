<?php


namespace Chat\Behavior;

use Container;
use Chat\Lib\User;
use Chat\Lib\Validators;
use \GatewayWorker\Lib\Gateway;
/**
 * 客户端发送信息
 * ==============errCode==============
 * -1  未登录
 * -2  用户已下线
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
                    $userSess = Gateway::getSession($client_id);
                    $data['from'] = $userSess;
                    Gateway::sendToGroup($userSess['room_id'], Container::encodeMessage($message['type'], $data));
                }elseif($data['user_id']){
                    if(Gateway::isUidOnline($data['user_id'])){
                        $data['from'] = Gateway::getSession($client_id);
                        $string = Container::encodeMessage($message['type'], $data);
                        Gateway::sendToUid($data['user_id'], $string);
                        Gateway::sendToCurrentClient($string);
                    }else{
                        Gateway::sendToCurrentClient( Container::encodeMessage($message['type'], $data,-2,'对方已下线'));
//                        ['type':'send','data':['room_id':'','user_id':1,'message':'xdfasfafsaf']]
//                        ['type':'send','errCode':-2,'info':'对方已下线', 'data':['room_id':'','user_id':1,'message':'xdfasfafsaf','from']]
                    }
                }
                
//		echo  '这是一条消息',"\n";
//		$message['time'] = time();
//		Gateway::sendToCurrentClient(json_encode($message));
	}
	
}
