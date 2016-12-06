<?php
    session_start();

    require_once 'keys.php';
    require_once 'twitteroauth/autoload.php';

    use Abraham\TwitterOAuth\TwitterOAuth;

    $media_data = $_POST["data"];
    //セッションに入れておいたさっきの配列
    if(empty($_SESSION['access_token'])) {
        header('location: login.php');
    } else {
        $access_token = $_SESSION['access_token'];
    }

    //OAuthトークンとシークレットも使って TwitterOAuth をインスタンス化
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

    // 先頭のMIME情報を削除してBASE64デコード
    $media_data = base64_decode(preg_replace('@^data:image/[^;]*+;base64,@', '', $media_data));

    // 一時ファイルへ書き込み
    $tmpfname = tempnam("/tmp", "IGM");
    $handle = fopen($tmpfname, "w");
    fwrite($handle, $media_data);
    fclose($handle);

    $media = $connection->upload('media/upload', ['media' => $tmpfname]);
    $parameters = [
        'status' => '#PS4share',
        'media_ids' => $media->media_id_string
        ];

    $result = $connection->post('statuses/update', $parameters);
    echo $result;

    unlink($tmpfname);
?>
