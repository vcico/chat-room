<?php

namespace Behavior;

/**
 * 事件行为基类
 */

abstract class BaseBehavior
{
	/**
	 * 对不同的数据类型进行处理
	 * @param integer $clinet_id 客户端ID
	 * @param array $message 接受到的消息解析成的数组
	 */
	abstract public function run($client_id,$message);
	
}
