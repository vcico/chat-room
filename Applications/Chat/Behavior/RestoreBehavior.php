<?php

namespace Chat\Behavior;

use Container;
use Chat\Lib\User;
use GatewayWorker\Lib\Gateway;
/**
 * 断开重连时恢复 session
 *
 * @author Administrator
 */
class RestoreBehavior extends BaseBehavior
{
    public function rules() {
        return [
            ['token',function($data,$rule){
                return is_string($data['token']) && strlen($data['token'])==32;
            },'errorMsg' => '暗号格式错误'],
        ];
    }
    
    public function run($client_id, $message) {
        if(!Container::$validator->validate($this->rules(), $message['data'])){
            Gateway::sendToCurrentClient(Container::encodeMessage($message['type'], Container::$validator->errors, 1));
            return false;
        }
        if(!$userinfo = User::restore($client_id, $message['data']['token'])){
            Gateway::sendToCurrentClient(Container::encodeMessage($message['type'], [], 2, '暗号对不上 请重新登录'));
            return false;
        }
        Gateway::sendToCurrentClient(Container::encodeMessage($message['type'],['username'=> $userinfo['username'],'user_id'=> $userinfo['userid'],'token'=>$userinfo['token']]));
    }
}
