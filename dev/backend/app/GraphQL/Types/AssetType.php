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

class AssetType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'AssetType',
            'fields' => [
                'assetType' => Type::string(),
                'assetTypeName' => Type::string(),
                'assetTypeValueId' => Type::int(),
                'assetUsageType' => Type::string(),
                'doi' => Type::string(),
                'id' => Type::string(),
                'masterFlag' => Type::string(),
                'mediaType' => Type::string(),
                'extension' => Type::string(),
                'sortOrder' => Type::int(),
                'checked' => Type::boolean()
            ],
        ];

        parent::__construct($config);
    }
}