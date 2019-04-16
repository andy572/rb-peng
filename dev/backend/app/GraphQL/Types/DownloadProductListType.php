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

class DownloadProductListType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'DownloadProductListType',
            'fields' => [
                'requestDownload' => [
                    'type' => Type::string(),
                    'args' => [
                        'products' => Type::nonNull(Type::listOf(new DownloadProductType()))
                    ],
                    'resolve' => function($unused, $args) {
                        return 'This is your string';
                    }
                ],
            ],
        ];

        parent::__construct($config);
    }
}