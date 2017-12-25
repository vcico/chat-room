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
 * # url		网址验证
 * 
 */
class validators
{
	
	private $data;
	
	public $errors = [];
	
	public function addError($field,$message)
	{
		$this->errors[]= [$field,$message];
	}
	
	public function integer_rule(string $field)
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
	
	private function required_rule(string $field)
	{
		if(!isset($this->data[$field]) || $this->data[$field] == '')
		{
			$this->addError($field,'该字段必须存在并且不能为空！');
		}
	}
	
	/**
	 * 数据验证
	 */
	public function validate(Array $ruleLists,Array $data)
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
			if(!is_string($ruleRow[1]))
			{
				throw new Exception('data validation rule exception: rule name must is string');
			}
			$rule = $ruleRow[1].'_rule';
			
			$fields = $ruleRow[0];
			if(!method_exists($this,$rule)){
				throw new Exception($rule.': validation rule method not exist');
			}
			if(is_string($fields))
			{
				$this->$rule($fields);
			}elseif(is_array($fields)){
				foreach($fields as $field)
				{
					$this->$rule($field);
				}
			}
		}
		return (boolean)$this->errors ? false: true;
	}
	
}

