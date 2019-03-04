<?php

return [
    'enabled' =>  !stristr($_SERVER['SERVER_NAME'], 'mediamarkt.') && stristr($_SERVER['SERVER_ADDR'], '127.'),
    'proxy_user' => '',
    'proxy_pass' => '',

    'http_proxy_host'  => 'bluecoat.media-saturn.com',
    'http_proxy_port'  => '80',

    'https_proxy_host' => 'bluecoat.media-saturn.com',
    'https_proxy_port' => '80'
];