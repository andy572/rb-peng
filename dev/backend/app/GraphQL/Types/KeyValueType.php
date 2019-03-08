<?php
/**
 * Created by PhpStorm.
 * User: Andreas
 * Date: 08.03.2019
 * Time: 10:34
 */

namespace App\GraphQL\Types;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class KeyValueType extends ObjectType {
    public function __construct($name, array $children = []) {
        $config = [
            'name' => $name,
            'fields' => [
                'name' => Type::string(),
                'value' => Type::string()
            ],
        ];

        if (!empty($children) && isset($children['field']) && isset($children['type'])) {
            $config['fields'][$children['field']] = $children['type'];
        }

        parent::__construct($config);
    }
}