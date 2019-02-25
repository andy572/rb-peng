<?php

namespace App\Http\Controllers;

use GraphQL\GraphQL;
use GraphQL\Type\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Illuminate\Http\Request;

class GraphqlController extends Controller {
    public function index(Request $request) {

        $queryType = new ObjectType([
            'name' => 'ArticlesQuery',
            'fields' => [
                'articles' => [
                    'type' => Type::listOf(Type::int()),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => function ($root, $args) {
                        return [$args['id']];
                    }
                ],
            ],
        ]);

        $schema = new Schema([
            'query' => $queryType
        ]);

        $input = $request->all();
        $query = isset($input['query']) && !empty($input['query']) ? $input['query'] : "";
        $variableValues = isset($input['variables']) && !empty($input['variables']) ? $input['variables'] : null;

        try {
            $rootValue = null;
            $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage()
                    ]
                ]
            ];
        }

        return $output;
    }
}