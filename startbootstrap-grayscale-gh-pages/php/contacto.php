<?php
require_once "../terceros/recaptchalib.php";

$secret = "6LcboA8UAAAAAFP8pW_LehJES_WOSsEc5xi1WEDB";

if(isset($_POST['g-recaptcha-response'])){

}
// respuesta vacía
$response = null;

// comprueba la clave secreta
$reCaptcha = new ReCaptcha($secret);
$scontacto = $_REQUEST['datos'];
$ocontacto=json_decode($scontacto);
$destinatario= 'info@legendpadel.com';
$remitente = $ocontacto->remitente;
$asunto = $ocontacto->asunto;
$mensaje = $ocontacto->mensaje;
$cabeceras = 'From: '.$remitente . "\r\n" .
    'Reply-To: '.$destinatario . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$success = mail($destinatario, $asunto, $mensaje, $cabeceras);

if ($success) {
    echo '<p>Su correo ha sido enviado correctamente</p>';
} else {
    echo '<p><strong>Se produjo un error al enviar su mensaje</strong></p>';
}
?>
