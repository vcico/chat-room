<?php

namespace Chat\Lib;

use Exception;


/**
 * 数据验证类
 * ====================================================== 
 * required 验证必须存在的参数 且不能为空
 * 其他验证方式 只有参数存在时才验证 不存在则跳过
 * ======================================================
 * integer 	整数
 * required 不可缺少
 * length	字符串长度
 * 
 * 支持自定义函数  ['username' ,function($data,$rule){ 
						return false/true;
						// 必须返回参数 false 代表未验证通过  会使用 errorMsg
					},'errorMsg'=>'用户名重复']
 * 其中之一为有效参数  ['room_id|user_id','oneOf'],
 * 
 */
class Validators
{
        /**
         * @var string 多个字段分隔符(其中之一为有效参数等会到)
         */
        const DELIMITER = '|';
    
	private $data;
	
	public $errors = [];
	
	public function addError($field,$message)
	{
            $this->errors[]= [$field,$message];
	}
	
        /**
         * 其中之一为有效参数
         * @param string $fields 多个字段拼接成的字符串
         */
        public function oneOf_rule($fields,array $rule)
        {
            $result = false;
            foreach(explode(self::DELIMITER, $fields) as $field)
            {
                if(isset($this->data[$field]) && $this->data[$field])
                {
                    $result = true;
                    break;
                }
            }
            if(!$result)
            {
                $this->addError($fields, isset($rule['errorMsg'])?$rule['errorMsg']:'至少有一个为有效参数');
            }
        }
        
	/**
	 * 字符串参数验证规则
	 * @param string $field 参数名称
	 * @param array $rule 规则信息 
	 */
	private function string_rule($field,array $rule)
	{
            if(!is_string($this->data[$field]))
            {
                $this->addError($field,'必须为字符串');
            }
            if(isset($rule['length']) && is_array($rule['length']))
            {
                list($min,$max) = $rule['length'];
                if($min===null || $max===null){
                        throw new Exception('字符串长度控制必须是[$min,$max]数组');
                }
                $count = strlen($this->data[$field]);
                if($count < $min)	$this->addError($field,"至少需要 $min 位");
                if($count > $max)	$this->addError($field,"不能超过 $max 位");
            }
	}
	
	
	/**
	 * 整型参数验证规则
	 * @param string $field 参数名称
	 * @param array $rule 规则信息 
	 */
	private function integer_rule($field,array $rule)
	{
            if(isset($this->data[$field]))
            {
                if(0===strcmp($this->data[$field],(int)$this->data[$field]))
                {
                    return true;
                }else{
                    $this->addError($field,"必须为整数");
                }
            }
	}
	
	/**
	 * 不可缺少的参数验证规则
	 * @param string $field 参数名称
	 * @param array $rule 规则信息
	 */
	private function required_rule($field,array $rule)
	{
            if(!isset($this->data[$field]) || $this->data[$field] == '')
            {
                $this->addError($field,'该字段必须存在并且不能为空！');
            }
	}
	
	/**
	 * 调用验证规则 类方法 或 匿名函数
	 * @param string $field 参数名称
	 * @param array $rule 规则信息
	 */
	private function callValidateFunc($field,array $rule)
	{
		if(is_callable($rule[1])){  // 是 自定义函数
			$success = $rule[1]($this->data,$rule);
			if(!$success){
				$this->addError($field,$rule['errorMsg']);
			}
		}elseif(is_string($rule[1])){  // 是字符串
			$ruleFunc = $rule[1].'_rule';
			if(!method_exists($this,$ruleFunc)){
				throw new Exception($ruleFunc.': validation rule method not exist');
			}
			$this->$ruleFunc($field,$rule);
		}else{
			throw new Exception('data validation rule exception: rule name must is string');
		}
	}
	
	/**
	 * 数据验证
         * @param array $ruleLists 验证规则
         * @param array $data 验证的数据
	 */
	public function validate(array $ruleLists,array $data)
	{
		// if(!$data)
		// {
			// return false;
		// }
		$this->errors = [];
		$this->data = $data;
		foreach($ruleLists as $ruleRow)
		{
			if(count($ruleRow)<2)
			{
				throw new Exception('data validation rule exception：Rules Array must include two elements ');
			}			
			$fields = $ruleRow[0];
			if(is_string($fields))
			{
				$this->callValidateFunc($fields,$ruleRow);
			}elseif(is_array($fields)){
				foreach($fields as $field)
				{
					$this->callValidateFunc($field,$ruleRow);
				}
			}
		}
		return (boolean)$this->errors ? false: true;
	}
	
}

