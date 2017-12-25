<?php

/**
 * 容器 
 *	包括 redis mysql等常用组件
 *  以及 动态调用Behavior 只需单次实例化Behavior
 */
class container
{
	
	public static $redis;

	public static $mysql;

	public static $validator;

	private static $_container = [];

	public function __construct()
	{
		// self::$redis  =  new Redis();
		// self::$redis->connect('127.0.0.1',6379);
		// self::$mysql =	new \Workerman\MySQL\Connection('localhost', '3306', 'root', '123456', 'chat_room');
		self::$validator = new \Chat\Lib\validators();
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
			self::$_container[$name] = new $className;
		}
		return call_user_func_array([self::$_container[$name],'run'],$arguments);
	}


}

