<?php
try{
	$client = new SOAPClient(null,['location'=>'http://dev.sex.com/server.php','uri'=>'sex']);
	$result = $client->videolist();
	echo json_encode(['errCode'=>'0','info'=>'','data'=>$result]);
}catch(SOAPFault $e){
	echo json_encode(['errCode'=>'1','info'=>'数据请求失败','data'=>$e->getMessage()]);
}
