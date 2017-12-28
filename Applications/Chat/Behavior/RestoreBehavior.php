<?php

namespace Chat\Behavior;

/**
 * 断开重连时恢复 session
 *
 * @author Administrator
 */
class RestoreBehavior extends BaseBehavior
{
    public function rules() {
        return [
            ['token',function($data,$rule){
                return is_string($data['token']) && strlen($data['token'])==32;
            },'errorMsg' => '暗号对不上 请重新登录'],
        ];
    }
    
    public function run($client_id, $message) {
        
    }
}
