<?php

namespace Chat\Lib;

use GatewayWorker\Lib\Gateway;

/**
 * 房间管理类
 */
class Room
{
    /**
     * 创建房间
     * @param array $room_info 房间信息
     * @return boolean
     */
    public static function create($room_info)
    {
        
    }
    
    /**
     * 检查房间是否存在
     * @param integer $room_id 房间号
     * @return boolean
     */
    public static function exist($room_id)
    {
        
    }
    
    /**
     * 删除已存在的房间 (当该房间没有用户存在时)
     * @param integer $room_id 房间号
     * @return boolean
     */
    public static function delete($room_id)
    {
        
    }
    
    /**
     * 发送房间消息
     * @param integer $room_id 房间ID
     * @param array $data   发送的消息 (未编码之前的完整数据)
     */
    public static function sendMessage($room_id,$data)
    {
        
    }
    
}