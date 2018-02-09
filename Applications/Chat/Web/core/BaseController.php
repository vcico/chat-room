<?php


namespace Chat\Web\core;

/**
 * Description of BaseController
 *
 * @author Administrator
 */
abstract class BaseController {
   
    public function render($template,$params)
    {
        extract($params);
        include JC::getConfig('view_path').'/'.$template.'.php';
    }
    
    
}
