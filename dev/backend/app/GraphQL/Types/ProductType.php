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
                'displayName' => Type::string(),
                'articleNumber' => Type::int(),
                'catalogEntryId' => Type::int(),
                'longDescription' => Type::string(),
                'onlineStatus' => Type::boolean(),
                'rating' => Type::float(),
                'salesPrice' => Type::float(),
                'shipping' => Type::float(),
                'shortDescription' => Type::string(),
                'featureGroups' => Type::listOf(
                    new KeyValueType('ProductFeatureGroup', [
                        'field' => 'features',
                        'type' => Type::listOf(new KeyValueType('ProductFeature'))
                    ])
                ),
                'assets' => Type::listOf(new AssetType())
            ],
        ];

        parent::__construct($config);
    }
}