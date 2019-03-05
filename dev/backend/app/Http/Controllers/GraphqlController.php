<?php

namespace App\Http\Controllers;

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GraphqlController extends Controller {
    public function index(Request $request) {

        $input = $request->all();
        $operation = isset($input['operationName']) && !empty($input['operationName']) ? trim($input['operationName']) : "";
        $query = isset($input['query']) && !empty($input['query']) ? trim($input['query']) : "";
        $variableValues = isset($input['variables']) && !empty($input['variables']) ? $input['variables'] : null;

        if (empty($query) || empty($operation)) {
            $output = [
                'errors' => [
                    [
                        'message' => "Illegal request"
                    ]
                ]
            ];

            return $output;
        }

        try {
            $schemaClass = '\\App\\GraphQL\\Schemas\\' . $operation . "Schema";
            if (!class_exists($schemaClass)) {
                throw new \Exception("Type $schemaClass doesn't exists");
            }

            $schema = call_user_func($schemaClass."::create");

            $rootValue = null;
            $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
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