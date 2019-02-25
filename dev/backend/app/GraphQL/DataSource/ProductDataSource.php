<?php

namespace App\GraphQL\DataSource;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class ProductDataSource {

    public static function resolve(array $product_id) {
        $ids = implode(',', $product_id);

        $url = 'https://api.mediamarktsaturn.com/v1/car-nice-api/rest/awesome/MediaDE/de_DE?source=best&oulet=1125&evaluateTemplate=true&evaluateFeatureFrame=true&products='.$ids.'&apikey=04mueo30S053Ec00pxIIk0j3ejpfOHMK';

        $result = [];
        try {
            $client = new Client(); //GuzzleHttp\Client
            $data = $client->request('GET', $url, [
                'proxy' => [
                    'http'  => 'http://bratfisch:just4Kids@bluecoat.media-saturn.com:80', // Use this proxy with "http"
                    'https' => 'http://bratfisch:just4Kids@bluecoat.media-saturn.com:80', // Use this proxy with "https"
                ]
            ]);

            $content = $data->getBody()->getContents();
            $json = json_decode($content);

            foreach ($product_id as $id) {
                if (isset($json->$id)) {
                    $d = $json->$id;
                    $result[$d->articleNumber] = ['id' => $d->articleNumber, 'name' => $d->displayName, 'assets' => []];
                }
            }

        } catch( GuzzleException $e) {
        }

        return $result;
    }

    // don't call "new" on resolver
    private function __construct(){
    }
}