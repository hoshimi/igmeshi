<?php
    session_start();

    require_once 'keys.php';
    require_once 'twitteroauth/autoload.php';

    use Abraham\TwitterOAuth\TwitterOAuth;

    //セッションに入れておいたさっきの配列
    if(empty($_SESSION['access_token'])) {
        header('location: login.php');
    } else {
        $access_token = $_SESSION['access_token'];
    }

    $media_data = $_POST["data"];
    $post_message = $_POST["message"];

    //OAuthトークンとシークレットも使って TwitterOAuth をインスタンス化
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
    $connection->setTimeouts(10, 20);

    // 先頭のMIME情報を削除してBASE64デコード
    $media_data = base64_decode(preg_replace('@^data:image/[^;]*+;base64,@', '', $media_data));

    // 一時ファイルへ書き込み
    $tmpfname = tempnam("/tmp", "IGM");
    $handle = fopen($tmpfname, "w");
    fwrite($handle, $media_data);
    fclose($handle);

    try {
        $media = $connection->upload('media/upload', ['media' => $tmpfname]);
    } catch (Exception $e) {
    die($connection->getLastHttpCode().":".$e->getMessage());
    } finally {
        unlink($tmpfname);
    }

    $parameters = [
        'status' => $post_message,
        'media_ids' => $media->media_id_string
        ];

    try {
        $result = $connection->post('statuses/update', $parameters);
    } catch (Exception $e) {
        die($e->getMessage());
    }

    if($connection->getLastHttpCode() !== 200) {
        die($connection->getLastHttpCode().":".$result->errors[0]->message);
    }
?>
