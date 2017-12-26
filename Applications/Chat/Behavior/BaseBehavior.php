<?php

namespace Chat\Behavior;

/**
 * 事件行为基类
 */

abstract class BaseBehavior
{
	
	/**
	 * 数据检查规则
	 * 所有的验证规则 验证结果都各自验证、处理 没有做统一处理 (在container调用时)
	 */
	public function rules(){
		return [];
	}
	
	/**
	 * 对不同的数据类型进行处理
	 * @param integer $clinet_id 客户端ID
	 * @param array $message 接受到的消息解析成的数组
	 */
	abstract public function run($client_id,$message);
	
}
