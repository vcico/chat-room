<?php


namespace Chat\Web\controllers;

use JC;
use Chat\Web\core\BaseController;

/**
 * Description of IndexController
 *
 * @author Administrator
 */
class IndexController extends BaseController{
    
    public function actionIndex(){
        $this->render('index', ['title' => 'title!!!!!!']);
    }
    

}
