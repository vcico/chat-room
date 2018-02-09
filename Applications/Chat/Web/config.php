<?php

if(!defined('START'))  throw new Exception('',404);

return [
//	'core_path' => __dir__.'/core',
	'controller_path' => __dir__.'/controllers',
	'view_path' => __dir__.'/views',
        'controllerNamespace' => '\Chat\Web\controllers\%s',
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => true,
        ],
	'component' => [
//            'mysql' => function(){
//                return (new \Workerman\MySQL\Connection('localhost', 3306, 'root', '123456', 'chat_room'));
//            },
            'mysql' => [
                'class' => '\Workerman\MySQL\Connection',
                '__args' => ['localhost', 3306, 'root', '123456', 'chat_room'],
            ],
            'redis' => function(){
                $r = new \Redis();
                $r->connect('localhost',6379);
                return $r;
            },
        ],
];