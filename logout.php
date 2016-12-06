<?php
    session_start();
    unset($_SESSION['access_token']);
    unset($_SESSION['twitter_user']);
    header('location: index.php');
?>
