<?php

namespace App\GraphQL\DataSource;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class ProductDataSource {

    public static function resolve(array $product_id) {
        $ids = implode(',', $product_id);

        if (empty($ids))
            return [];

        $url = 'https://api.mediamarktsaturn.com/v1/car-nice-api/rest/awesome/MediaDE/de_DE?source=best&oulet=1125&evaluateTemplate=true&evaluateFeatureFrame=true&products='.$ids.'&apikey=04mueo30S053Ec00pxIIk0j3ejpfOHMK';

        $result = [];
        try {
            $proxy_conf = config('proxy');
            $proxy = [];
            if (isset($proxy_conf['enabled']) && $proxy_conf['enabled']) {
                $user = isset($proxy_conf['proxy_user']) && !empty($proxy_conf['proxy_user']) ? $proxy_conf['user'] : '';
                $pass = isset($proxy_conf['proxy_pass']) && !empty($proxy_conf['proxy_pass']) ? $proxy_conf['pass'] : '';

                $http_proxy_host  = isset($proxy_conf['http_proxy_host']) && !empty($proxy_conf['http_proxy_host']) ? $proxy_conf['http_proxy_host'] : '';
                $http_proxy_port  = isset($proxy_conf['http_proxy_port']) && !empty($proxy_conf['http_proxy_port']) ? $proxy_conf['http_proxy_port'] : '';

                $https_proxy_host = isset($proxy_conf['https_proxy_host']) && !empty($proxy_conf['https_proxy_host']) ? $proxy_conf['https_proxy_host'] : '';
                $https_proxy_port = isset($proxy_conf['https_proxy_port']) && !empty($proxy_conf['https_proxy_port']) ? $proxy_conf['https_proxy_port'] : '';

                $http_proxy  = null;
                $https_proxy = null;

                if (!empty($user)) {
                    if (!empty($pass)) {
                        $user = "$user:$pass@";
                    }
                    else {
                        $user = "$user@";
                    }

                    $http_proxy = "http://" . $user . $http_proxy_host;
                    if (!empty($http_proxy_port))
                        $http_proxy .= ':' . $http_proxy_port;

                    $https_proxy = "http://" . $user . $https_proxy_host;
                    if (!empty($https_proxy_port))
                        $https_proxy .= ':' . $https_proxy_port;

                } else {

                    $http_proxy = "http://" . $http_proxy_host;
                    if (!empty($http_proxy_port))
                        $http_proxy .= ':' . $http_proxy_port;

                    $https_proxy = "http://" . $https_proxy_host;
                    if (!empty($https_proxy_port))
                        $https_proxy .= ':' . $https_proxy_port;
                }

                $proxy['http']  = $http_proxy;
                $proxy['https'] = $https_proxy;
            }

            $client = new Client(); //GuzzleHttp\Client
            $data = $client->request('GET', $url, [ $proxy ]);

            $content = $data->getBody()->getContents();
            $json = json_decode($content);

            foreach ($product_id as $id) {
                if (isset($json->$id)) {
                    $d = $json->$id;
                    $result[$d->articleNumber] = ['id' => $d->articleNumber, 'name' => $d->displayName, 'assets' => []];
                }
            }

        } catch( GuzzleException $e) {
            $result['errors'] = $e->getMessage();
        }

        return $result;
    }

    // don't call "new" on resolver
    private function __construct(){
    }
}