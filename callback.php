<?php
    session_start();

    require_once 'keys.php';
    require_once 'twitteroauth/autoload.php';

    use Abraham\TwitterOAuth\TwitterOAuth;

    //login.phpでセットしたセッション
    $request_token = [];
    $request_token['oauth_token'] = $_SESSION['oauth_token'];
    $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

    //Twitterから返されたOAuthトークンと、あらかじめlogin.phpで入れておいたセッション上のものと一致するかをチェック
    if (isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
        die( 'Error!' );
    }

    //OAuth トークンも用いて TwitterOAuth をインスタンス化
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);

    $_SESSION['access_token'] = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));

    //ユーザー情報をGET
    $user = $connection->get("account/verify_credentials");
    $_SESSION['twitter_user'] = $user;

    //セッションIDをリジェネレート
    session_regenerate_id();

    //マイページへリダイレクト
    header( 'location: index.php' );
?>
