<?php

require "Applications/Chat/container.php";
require_once __DIR__ . '/vendor/autoload.php';


new container();

#print_r(container::$redis);
#print_r(container::$mysql);
#print container::send('1','xx');
$result = container::$mysql->select('count(userid) as exist')->from('user')->where('username=:name')->bindValues(['name'=>'123456'])->single();
print_r($result);



