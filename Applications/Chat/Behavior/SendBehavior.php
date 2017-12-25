<?php


namespace Chat\Behavior;

use \GatewayWorker\Lib\Gateway;
/**
 * 客户端发送信息
 */
class SendBehavior extends BaseBehavior
{
	
	public function run($client_id,$message)
	{
		echo  '这是一条消息',"\n";
		$message['time'] = time();
		Gateway::sendToCurrentClient(json_encode($message));
	}
	
}
