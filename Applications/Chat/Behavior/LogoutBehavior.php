<?php

namespace Chat\Behavior;

use Chat\Lib\User;
/**
 * 退出登陆
 */
class LogoutBehavior extends BaseBehavior 
{
	
	public function run($client_id,$message)
	{
            User::logout($client_id);
	}

}
