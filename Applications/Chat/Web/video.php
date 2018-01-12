<?php
try{
	$client = new SOAPClient(null,['location'=>'http://dev.sex.com/server.php','uri'=>'sex']);
	$result = $client->videolist();
        foreach($result as $key => $val){
            $result[$key]['file'] = 'http://dev.sex.com/'.$val['file'];
        }
	echo 'callback('.json_encode(['errCode'=>'0','info'=>'','data'=>$result]).')';
}catch(SOAPFault $e){
	echo 'callback('. json_encode(['errCode'=>'1','info'=>'数据请求失败','data'=>$e->getMessage()]).')';
}
