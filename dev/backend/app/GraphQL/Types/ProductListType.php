<?php
/**
 * Created by PhpStorm.
 * User: andreas
 * Date: 25.02.19
 * Time: 11:03
 */

namespace App\GraphQL\Types;


use App\GraphQL\DataSource\ProductDataSource;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductListType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'ProductListType',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(new ProductType()),
                    'args' => [
                        'product_id' => Type::nonNull(Type::listOf(Type::int())),
                    ],
                    'resolve' => function ($unused, $args) {
                        return ProductDataSource::resolve($args['product_id']);
                    }
                ],
            ],
        ];
        parent::__construct($config);
    }
}
