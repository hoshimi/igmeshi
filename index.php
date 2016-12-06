<?php header('Content-Type: text/html; charset=utf-8');  ?>
<?php session_start(); ?>

<html>
    <head>
        <title>igmeshi</title>
        <!-- Latest compiled and minified Bootstrap CSS -->
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

        <!-- Font Awesome -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <meta name="viewport" content="width=device-width,user-scalable=no,maximum-scale=1" />
        <link rel="stylesheet" type="text/css" href="css/style.css" media="screen and (min-device-width: 769px)">
        <link rel="shortcut icon" href="favicon.ico">
        <script src="./node_modules/jquery/dist/jquery.min.js"></script>
        <script src="./gana.js"></script>
        <script type="text/javascript">
            <?php
                if(isset($_SESSION['twitter_user'])){
                    echo "let isTwitterLoggedIn = true";
                } else {
                    echo "let isTwitterLoggedIn = false";
                }
            ?>
        </script>
    </head>
    <body>
        <div id="app"></div>
        <script src="./build/index.js"></script>
    </body>
</html>
