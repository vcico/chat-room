<?php


namespace Chat\Behavior;

use container;
use GatewayWorker\Lib\Gateway;

/**
 * 注册事件
 * ============数据结构==============
 * 		接收 ['type'=>'','data'=>[
			'username' => '',
			'password' => '',
			'repeat-password' => '',
			'code' => '',
		]]
		返回 ['type'=>'','errCode' => 0 , 'info' => '操作成功/失败','data'=>[
			'user_id' => '',
			'username' => '',
		]]
 * ===============errCode说明===================
 *  0  操作成功 没有错误
 *	1  数据验证失败
 *  2  添加到数据库失败
 * =============================================
 */
class RegisterBehavior extends BaseBehavior
{


	/**
	 * 用户名是否已经存在
	 * @param string $username  用户名
	 */
	public static function exist($username)
	{
		return (boolean)container::$mysql->select('count(userid) as exist')->from('user')->where('username=:name')->bindValues(['name'=>$username])->single();
	}

	/**
	 * @inheritdoc
	 */
	public function rules()
	{
		return [
			[['username','password'],'required'],
			['username',function($data,$rule){
				return self::exist($data['username'])?false:true;
			},'errorMsg' => '用户名已存在'],
			['password','string','length'=>[6,32]],
		];
	}

	/**
	 * @inheritdoc
	 */
	public function run($client_id,$message)
	{
		$data = $message['data'];
		if(!container::$validator->validate($this->rules(),$data))
		{
			$msg = container::encodeMessage($message['type'],container::$validator->errors,1,'参数错误！');
		}else{
			$data['password'] = container::generatePasswordHash($data['password']);  // 密码加密
			$insert_id = container::$mysql->insert('user')->cols($data)->query();
			if($insert_id){
				$msg = container::encodeMessage($message['type'],['username'=>$data['username'],'user_id'=>$insert_id]);
				Gateway::setSession($client_id, ['username'=>$data['username'],'user_id'=>$insert_id]);
			}else{
				$msg = container::encodeMessage($message['type'],[],2,'添加用户失败 请稍后重试！');
				// @log
			}
		}
		Gateway::sendToCurrentClient($msg);
	}

}

