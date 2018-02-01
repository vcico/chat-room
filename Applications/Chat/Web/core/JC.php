<?php



/**
 * Description of JC
 *
 * @author Administrator
 */
class JC {
    
    private static $config;
    
    public static $mysql;
    
    /**
     *
     * @var \Redis
     */
    public static $redis;
    
//    public static $validator;
    
    public function __construct($config)
    {
        self::$config =  $config;
        self::init();
    }
    
    /**
     * 
     * @throws Exception
     */
    public static function init()
    {
        self::$redis  =  new Redis();
        $redisConfig = self::getConfig('redis');
        if($redisConfig===null || !isset($redisConfig['host']) || !isset($redisConfig['port']))  throw new Exception('redis connect failt : config syntax error');
        self::$redis->connect($redisConfig['host'],$redisConfig['port']);
        isset($redisConfig['auth']) && self::$redis->auth($redisConfig['auth']);
        isset($redisConfig['db']) && self::$redis->select($redisConfig['db']);
        $mysqlConfig = self::getConfig('mysql');
        if($mysqlConfig===null|| !isset($mysqlConfig['host']) || !isset($mysqlConfig['port']) || !isset($mysqlConfig['username']) || !isset($mysqlConfig['password']) || !isset($mysqlConfig['db']))  
            throw new Exception('Mysql connect failt : config syntax error');
        self::$mysql =	new \Workerman\MySQL\Connection($mysqlConfig['host'], $mysqlConfig['port'], $mysqlConfig['username'], $mysqlConfig['password'], $mysqlConfig['db']);
//        self::$validator = new \Chat\Lib\Validators();
    }
    
    public static function getConfig($name)
    {
        return isset(self::$config[$name])?self::$config[$name]:null;
    }
    
    public static function getUrlParams()
    {
        
    }
    
    public function run()
    {
        
    }
    
    
}
