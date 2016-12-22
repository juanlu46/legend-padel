<?php
echo 'hola';
if(isset($_POST['g-recaptcha-response'])) {
    echo 'dentro';
    $secret = "6LcboA8UAAAAAFP8pW_LehJES_WOSsEc5xi1WEDB";
    $captcha = $_POST['g-recaptcha-response'];
    echo 'c'.$captcha;
    $result = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha);
    $obj = json_decode($result,true);
    $respuesta = 'El captcha no fue verificado';

    if($obj['success']==true){ //captcha verificado con exito
        $respuesta = 'perfe';
    }


    echo $respuesta;
    /*$reCaptcha = new ReCaptcha($secret);
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );

    if ($response != null && $response->success)
        echo "okk";*/

}