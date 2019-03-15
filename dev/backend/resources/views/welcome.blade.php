<!doctype html>
<html>
<head>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        body {margin: 0; padding: 0;}
        .main-container {
            padding-left: 15px;
            padding-top: 15px;
            padding-bottom: 15px;
            padding-right: 0;
            position: fixed;
            top: 70px;
            left: 0;
            right: -15px;
            bottom: -90px;
            height: 92%;
        }
        .no-scroll {
            overflow: hidden;
        }
        .scroll-pane {
            overflow-y: auto;
            min-height: 100%;
            padding: 10px;
        }
    </style>
</head>
<body>
<div id="app-root" class="no-scroll"></div>
<script type="text/javascript" src="./js/bundle.js"></script>
</body>
</html>
