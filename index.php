<?php header('Content-Type: text/html; charset=utf-8');  ?>
<?php session_start(); ?>

<html>
    <head>
        <title>igmeshi</title>
        <!-- Latest compiled and minified Bootstrap CSS -->
        <link rel="stylesheet" href="css/bootstrap.min.css">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <meta name="viewport" content="width=device-width,user-scalable=no,maximum-scale=1" />
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="shortcut icon" href="favicon.ico">
        <script src="./node_modules/jquery/dist/jquery.min.js"></script>
        <script src="./gana.js"></script>
        <script type="text/javascript">
            <?php
                if(isset($_SESSION['twitter_user'])){
                    echo "var isTwitterLoggedIn = true;";
                } else {
                    echo "var isTwitterLoggedIn = false;";
                }
            ?>
        </script>
    </head>
    <body>
        <div id="app">
            対応ブラウザ: Chrome<br/>Chromeでも動かない場合は、Chromeを最新バージョン(最低でも50以上？)へ更新して下さい。
        </div>
        <script src="./build/index.js"></script>
    </body>
</html>
