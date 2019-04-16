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

class DownloadAssetType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'DownloadAssetType',
            'fields' => [
                'doi' => Type::string()
            ],
        ];

        parent::__construct($config);
    }
}