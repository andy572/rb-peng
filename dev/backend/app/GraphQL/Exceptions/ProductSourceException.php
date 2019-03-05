<?php
/**
 * Created by PhpStorm.
 * User: Andreas
 * Date: 05.03.2019
 * Time: 15:45
 */

namespace App\GraphQL\Exceptions;


use GraphQL\Error\ClientAware;

class ProductSourceException extends \Exception implements ClientAware {
    public function isClientSafe() {
        return true;
    }

    public function getCategory() {
        return "ProductSource";
    }
}