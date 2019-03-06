<?php
/**
 * Created by PhpStorm.
 * User: andreas
 * Date: 25.02.19
 * Time: 11:58
 */

namespace App\GraphQL\Types;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'ProductType',
            'fields' => [
                'name' => Type::string(),
                'id' => Type::int(),
                'assets' => Type::listOf(new AssetType())
            ],
        ];

        parent::__construct($config);
    }
}