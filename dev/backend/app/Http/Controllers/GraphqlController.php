<?php

namespace App\Http\Controllers;

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use Illuminate\Http\Request;

class GraphqlController extends Controller {
    public function index(Request $request) {

        $input = $request->all();
        $operation = isset($input['operationName']) && !empty($input['operationName']) ? $input['operationName'] : "";
        $query = isset($input['query']) && !empty($input['query']) ? $input['query'] : "";
        $variableValues = isset($input['variables']) && !empty($input['variables']) ? $input['variables'] : null;

        try {
            $typeClass = '\\App\\GraphQL\\Types\\' . $operation . "Type";
            if (!class_exists($typeClass)) {
                throw new \Exception("Type $typeClass doesn't exists");
            }

            $ref = new \ReflectionClass($typeClass);
            if (!$ref->isInstantiable()) {
                throw new \Exception("Type $typeClass can't be instantiated");
            }
            $inst = $ref->newInstance();

            $schema = new Schema([
                'query' => $inst
            ]);

            $rootValue = null;
            $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]
                ]
            ];
        }

        return $output;
    }
}