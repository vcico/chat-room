<?php

require "Applications/Chat/container.php";
require_once __DIR__ . '/vendor/autoload.php';


new container();

#print_r(container::$redis);
#print_r(container::$mysql);
// print_r(container::$validator);
#print container::send('1','xx');
// $result = container::$mysql->select('count(userid) as exist')->from('user')->where('username=:name')->bindValues(['name'=>'123456'])->single();
// print_r($result);


// $ruleLists = [
	// [['username','password'],'required'],
	// ['sex','integer'],
	// ['username',function($data,$rule){
		// return !in_array($data['username'],['123','456']);
	// },'errorMsg'=>'用户名已存在'],
// ];
// $data = [
	// 'username' => '123',
	// 'password' => '12345678',
	// 'sex' => '3',
// ];

// var_dump(container::$validator->validate($ruleLists,$data));
// print_r(container::$validator->errors);



