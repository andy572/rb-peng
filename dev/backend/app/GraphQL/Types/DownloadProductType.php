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

class DownloadProductType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'DownloadProductType',
            'fields' => [
                'articleNumber' => Type::int(),
                'assets' => Type::listOf(new DownloadAssetType())
            ]
        ];

        parent::__construct($config);
    }
}