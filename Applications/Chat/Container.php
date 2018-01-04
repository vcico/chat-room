<?php

/**
 * 容器 
 *	包括 redis mysql等常用组件
 *  以及 动态调用Behavior 只需单次实例化Behavior
 *  为保持数据格式的一致性 和 可移植性 统一在这里处理信息的解析和编码
 */
class Container
{
	
        public static $redisKeys = [
            'user_session' => 'chatroom_user_session'
            
        ];
    
	/**
         * @var \Redis
         */
	public static $redis;

        /**
         * @var \Workerman\MySQL\Connection
         */
	public static $mysql;

        /**
         * @var \Chat\Lib\Validators
         */
	public static $validator;

	private static $_container = [];
	
	/**
	 * 解析接收到的信息 ： type和data必须的
	 * @example ['type'=>'','data'=>[]]
	 * @see 数据模型说明 DATA_MODEL.md
	 */
	public static function decodeMessage($message)
	{
		if(!$message){
			// @log
			throw new Exception('接收到的数据不能为空');
		}
		$data = json_decode($message, true);
		if(!isset($data['type']) || !isset($data['data']))
		{
			// @log
			throw new Exception('接收到的数据格式错误');
		}
		return $data;
	}
	
	/**
	 * 编码将要发送的信息
	 * @param string $type 消息类型
	 * @param array $data 消息内容
	 * @param integer $errCode 错误码
	 * @param string $info 提示消息
	 *
	 * @example ['type'=>'','errCode' => 0 , 'info' => '发送成功/失败','data'=>[]]
	 * @see 数据模型说明 DATA_MODEL.md
	 */
	public static function encodeMessage($type,$data,$errCode=0,$info='')
	{
		return json_encode(['type'=>$type,'errCode' => $errCode , 'info' => $info,'data'=>$data]);
	}
	
	
	public function __construct()
	{
		self::$redis  =  new Redis();
		self::$redis->connect('127.0.0.1',6379);
		self::$mysql =	new \Workerman\MySQL\Connection('localhost', '3306', 'root', '123456', 'chat_room');
		self::$validator = new \Chat\Lib\Validators();
	}

	/**
     * 动态获取Behavior
	 */
	public static function __callStatic($name,$arguments)
	{
		if(!array_key_exists($name,self::$_container))
		{
                    $name = ucfirst($name);
                    $className = '\Chat\Behavior\\'.$name.'Behavior';
                    #echo $className;
                    if(!is_file(__DIR__.'/Behavior/'.$name.'Behavior.php')){
                        // echo '这不是个文件:',__DIR__.'/Behavior/'.$name.'Behavior.php',"\n";
                        return false;
                    }
                    self::$_container[$name] = new $className;
		}
		return call_user_func_array([self::$_container[$name],'run'],$arguments);
	}


}

