<?php

namespace Chat\Behavior;

use Chat\Lib\User;
use Container;
use GatewayWorker\Lib\Gateway;
/**
 * 切换房间
 * 1 数据验证失败
 */

class  ChangeroomBehavior extends BaseBehavior
{

    public function rules() {
        return [
            ['room_id','required'],
            ['room_id','integer'],
        ];
    }    
    
    public function run($client_id,$message)
    {
        $data = $message['data'];
        if(!Container::$validator->validate($this->rules(), $data))
        {
            Gateway::sendToCurrentClient(Container::encodeMessage($message['type'],[],1,'房间ID不合法'));
        }
        User::ChangeRoom($client_id, $data['room_id']);
        Gateway::sendToCurrentClient(Container::encodeMessage($message['type'],[]));
    }


}
