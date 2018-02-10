<?php

namespace Chat\Web\controllers\admin;

use Chat\Web\core\BaseController;

/**
 * Description of IndexController
 *
 * @author Administrator
 */
class IndexController extends BaseController{
   
    public function actionIndex()
    {
        echo 'model=',$this->module;
        echo 'admin-index';
    }
    
    public function actionMenu()
    {
        echo 'this is menu';
    }
    
    
}
