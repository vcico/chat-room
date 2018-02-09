<?php

if(!defined('START'))  define('START',true);
require_once __DIR__. '/core/JC.php';
$config = require __DIR__. '/config.php';
$app = new JC($config);
$app->run();

//print_r(JC::mysql());

