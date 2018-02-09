<?php
namespace Chat\Web\core;


use JC;
use Chat\Web\core\exceptions\ViewNotFoundException;
/**
 * Description of BaseController
 *
 * @author Administrator
 */
abstract class BaseController {
   
    public function render($template,$params)
    {
        extract($params);
        $__file = JC::getConfig('view_path').'/'. strtolower(substr(get_called_class(),strrpos(get_called_class(),'\\')+1,-10)).'/'.$template.'.php';
        if(is_file($__file)){
            include $__file;
        }else{
            throw new ViewNotFoundException('template file not exist: '. $__file);
        }
    }

}
