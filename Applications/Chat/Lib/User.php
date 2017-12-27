<?php

namespace Chat\Lib;

use Container;
use GatewayWorker\Lib\Gateway;

/**
 * 用户类
 */
class User
{
    /**
     * 密码加密的前缀
     */
    const PASSWORD_PREFIX = 'chat-room-'; 
    
    /**
     * 默认房间号(群组)
     */
    const DEFAULT_ROOM = 1;
	
    /**
     * 用户连接成功后做的一些工作： 加入默认群组(房间) 设置SESSION ['room_id']等
     */
    public static function afterConnect($client_id)
    {
        Gateway::joinGroup($client_id, self::DEFAULT_ROOM);
        Gateway::setSession($client_id, ['room_id'=>self::DEFAULT_ROOM]);
    }
    
    /**
     * 用户登录 ： 绑定uid  加入房间(群组) 设置SESSION 记录Token 用于重连时恢复登录状态  
     */
    public static function login($client_id,$userinfo)
    {
        $token = self::generateToken($client_id, $userinfo['username']);
        $data = ['username'=>$userinfo['username'],'user_id'=>$userinfo['userid']];
        Gateway::updateSession($client_id, $data);
        Container::$redis->hSet(Container::$redisKeys['user_session'],$token,$userinfo['userid']);   // 记录token
        return $token;
    }
    
    /**
     * 重连时恢复
     */
    public static function restore($client_id,$token)
    {
        $userid = Container::$redis->hGet(Container::$redisKeys['user_session'],$token);
        if(!$userid)
        {
            // 未找到登录信息 无法恢复
            return false;
        }
        $userinfo = self::getUserinfoById($userid);
        self::login($client_id, $userinfo);
        Container::$redis->hDel(Container::$redisKeys['user_session'],$token);
        return true;
    }
    
    /**
     * 退出登录 (彻底清除用户登录状态)
     */
    public static function afterLogout($client_id)
    {
    }
    
    /**
     * 客户端关闭连接后 (缓存登录状态 重连时需要)
     */
    public static function afterClose($client_id)
    {
        
    }
    
    /**
     * 根据用户名获取用户信息
     * @param string $username  用户名
     */
    public static function getUserinfoByName($username)
    {
           return Container::$mysql->select('*')->from('user')->where('username=:name')->bindValues(['name'=>$username])->row();
           // return (boolean)Container::$mysql->select('count(userid) as exist')->from('user')
           // ->where('username=:name AND password=:pswd')->bindValues(['name'=>$username,'pswd'=>Container::generatePasswordHash($password)])->single();
    }
    public static function getUserinfoById($id)
    {
           return Container::$mysql->select('*')->from('user')->where('userid=:id')->bindValues(['id'=>$id])->row();
           // return (boolean)Container::$mysql->select('count(userid) as exist')->from('user')
           // ->where('username=:name AND password=:pswd')->bindValues(['name'=>$username,'pswd'=>Container::generatePasswordHash($password)])->single();
    }
    
    /**
     * 生成 Token 用于重新断开重连时恢复session
     * @param string $client_id 客户端ID
     * @param string $username  用户名
     * @return string 32位的 token
     */
    public static function generateToken($client_id,$username)
    {
        return md5($client_id.$username);
    }
    
    /**
     * 用户切换房间  （可以加入多个群组 但这里只能进入一个房间）
     * @param type $client_id
     * @param type $room_id
     */
    public static function ChangeRoom($client_id,$room_id)
    {
        $session = Gateway::getSession($client_id);
        Gateway::leaveGroup($client_id, isset($session['room_id'])?$session['room_id']:self::DEFAULT_ROOM);
        Gateway::joinGroup($client_id,$room_id);
        Gateway::updateSession($client_id, ['room_id'=>$room_id]);
    }
    
    
    /**
     * 判断当前用户是否已经登录
     */
    public static function isLogin()
    {
        return isset($_SESSION['user_id']);
    }
    
    /**
     *  生成密码 hash
     */
    public static function generatePasswordHash($password)
    {
            return md5(self::PASSWORD_PREFIX . $password);
    }
	
}
	