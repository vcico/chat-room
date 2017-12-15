<?php


namespace Behavior;

use container;
use GatewayWorker\Lib\Gateway;

/**
 * 注册事件
 */
class RegisterBehavior extends BaseBehavior
{


	/**
	 * 用户名是否已经存在
	 * @param string $username  用户名
	 */
	public function exist($username)
	{
		return (boolean)container::$mysql->select('count(userid) as exist')->from('user')->where('username=:name')->bindValues(['name'=>$username])->single();
	}

	/**
	 * 数据检查规则
	 */
	public function rules()
	{
		return [
			
		];
	}

	/**
	 * @inheritdoc
	 */
	public function run($client_id,$message)
	{
		$data = $message['data'];

		$insert_id = container::$mysql->insert('user')->cols($data)->query();
		if($insert_id)
		{
			unset($data['password']);	
			Gateway::sendToCurrentClient(json_encode($data));
		}else{
			echo '出错了 怎么办？',"\n";
		}
	}

}

