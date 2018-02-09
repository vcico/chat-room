<?php

use Chat\Web\core\exceptions\ConfigException;
use Chat\Web\core\exceptions\InvalidRouteException;

/**
 * Description of JC
 *
 * @author Administrator
 */
class JC {
    
    private static $config;
    
    private static $_componet;
    
    private static $_controllers;
    
    public function __construct($config)
    {
        self::$config =  $config;
        self::initComponet();
    }
    
    /**
     * 从配置文件 'component' 初始化公用组件 支持以下类型
     * - 匿名函数 ： 返回一个实例
     * - 数组     : 必须包含 'class' 键 值为完整类名称  其余键值为 类属性值
     * - 字符串   ：必须是完整类名称 包含命名空间
     */
    public static function initComponet()
    {
        if(isset(self::$config['component'])){
            foreach(self::$config['component'] as $key => $val){
                if($val instanceof Closure){  // is_callable($val) ||
                    self::$_componet[$key] = $val();
                }else{
                    self::$_componet[$key] = self::createObject($val);
                }
            }
        }
    }
    
    /**
     * __args 第三方类的构造函数参数
     * @param array|string $option
     * @return instance
     * @throws ConfigException 配置出错
     */
    public static function createObject($option)
    {
        if(is_array($option)){
            if(!isset($option['class']))
            {
                throw new ConfigException('Configuration format error : component must include class option');
            }
            $class = $option['class'];
            // 第三方扩展未遵循component规则 用 newInstanceArgs 生成实例
            $args = isset($option['__args'])?$option['__args']:false;  
            unset( $option['class']);
            unset( $option['__args']);
            $classObject = new ReflectionClass($class);
            if($args)
            {
                return $classObject->newInstanceArgs($args);
            }else{
                return self::configure($classObject->newInstance(),$option);
            }
        }elseif(is_string($option)){
            $classObject = new ReflectionClass($option);
            return $classObject->newInstance();
        }
        throw new ConfigException();
    }
    
    /**
     * 构造类类实例时 设置类属性
     * @param object $object
     * @param array $properties
     * @return object
     */
    public static function configure(&$object, $properties)
    {
            foreach ($properties as $name => $value) {
                    $object->$name = $value;
            }
            return $object;
    }
    
    public static function __callStatic($name, $arguments) {
        if(isset(self::$_componet[$name])){
            return self::$_componet[$name];
        }else{
            throw new \BadMethodCallException('Cant call '.$name);
        }
    }
    
    public static function getConfig($name)
    {
        return isset(self::$config[$name])?self::$config[$name]:null;
    }
    
    public static function getUrl()
    {
        return $_SERVER['REQUEST_URI'];
    }
    
    public static function getUrlParams()
    {
//        print_r(self::$config);
        $urlManager = isset(self::$config['urlManager'])?self::$config['urlManager'] :false;
        if($urlManager && $urlManager['enablePrettyUrl']){
            $url = self::getUrl();
            if ($url[0] == '/') {
                $url = substr($url, 1);
            }
            if($urlManager['showScriptName']){
                @list($file,$controller, $action) = explode('/', $url);
            }else{
                list($controller, $action) = explode('/', $url);
            }
            $controller==''&& $controller = 'index';
            $action==''&& $action = 'index';
        }else{
             $action = 'index';
            $controller = 'index';
            isset($_GET['c']) && $controller = trim($_GET['c']);
            isset($_GET['a']) && $action = trim($_GET['a']);
        }
        return [$controller,$action];
    }
    
    protected static function getController($controllerName)
    {
        $controllerClass = sprintf(self::$config['controllerNamespace'],ucfirst($controllerName).'Controller');
        if(class_exists($controllerClass)){
            self::$_controllers[$controllerName] = new $controllerClass;;
        }else{
            throw new InvalidRouteException('controller not exists :'.$controllerClass);
        }
        return  self::$_controllers[$controllerName];
    }


    public function run()
    {
        list($controller,$action) = self::getUrlParams();
        $controllerObject = self::$_controllers[$controller]?:self::getController($controller);
        $method = 'action'.ucfirst($action);
        if(!method_exists($controllerObject, $method)){
            throw new InvalidRouteException('controller action not exists:'.$method);
        }
        $controllerObject->$method();
    }
    
    
}
