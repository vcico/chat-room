<?php

namespace Chat\Behavior;

use Container;
use GatewayWorker\Lib\Gateway;

/**
 * 获取房间在线用户列表
 */

class  OnlineaccountBehavior extends BaseBehavior
{
    
    public function rules(){
//        return [
//            ['room_id','required'],
//            ['room_id','integer'],
//        ];
    }
    
    public function run($client_id,$message)
    {
        $userSess = Gateway::getSession($client_id);
        Gateway::sendToCurrentClient(Container::encodeMessage($message['type'], Gateway::getClientSessionsByGroup($userSess['room_id'])));
    }


}
