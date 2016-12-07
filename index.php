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
        <div class="footerAdv">
            <iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=chubounosuk00-22&o=9&p=8&l=as1&m=amazon&f=ifr&ref=qf_sp_asin_til&asins=B01DN9WFB6" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

            <iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS1=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=chubounosuk00-22&o=9&p=8&l=as1&m=amazon&f=ifr&ref=qf_sp_asin_til&asins=B01AS5EGXS" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
        </div>
    </body>
</html>
