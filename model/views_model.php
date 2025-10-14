<?php
class viewModel{
    protected static function get_view($view){//
        $white_list = ["home","new-user","users","edit-user","categoria","categorias","edit-categories","new-products","edit-product","product","products","new-clients","clients","edit-clients","new-proveedor","proveedor","edit-proveedor"];
        if (in_array($view, $white_list)) {
            if (is_file("./view/".$view.".php")) {
                $content = "./view/".$view.".php";
            }else{
                $content = "404";
            }
        }elseif($view == "login"){ 
            $content = "login";
        }else{
            $content = "404";
        }
         return $content;
    }
}
