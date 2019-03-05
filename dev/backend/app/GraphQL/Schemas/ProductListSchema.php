<?php
/**
 * Created by PhpStorm.
 * User: Andreas
 * Date: 05.03.2019
 * Time: 18:24
 */

namespace App\GraphQL\Schemas;


use App\GraphQL\Interfaces\SchemaInterface;
use App\GraphQL\Types\ProductListType;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;

class ProductListSchema implements SchemaInterface {

    public static function create() {
        $config = SchemaConfig::create([
                'query' => new ProductListType()
            ]
        );

        return new Schema($config);
    }

    // don't call constructor
    private function __construct() {
    }
}