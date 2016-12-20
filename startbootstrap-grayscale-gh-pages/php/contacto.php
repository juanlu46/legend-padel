<?php
$scontacto = $_REQUEST['datos'];
$ocontacto=json_decode($scontacto);
$destinatario= 'info@legendpadel.com';
$remitente = $ocontacto->remitente;
$asunto = $ocontacto->asunto;
$mensaje = $ocontacto->mensaje;
$headers = array();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset="iso-8859-1"' . "\n";
$headers[] ='Content-Transfer-Encoding: 7bit' ;
$headers[] = 'From: ' . $remitente;

$success = mail($destinatario, $asunto, $mensaje, $headers);
if ($success) {
    echo '<h1>Enhorabuena!</h1>';
    echo '<p>El  siguiente mensaje ha sido enviado: <br/><br/>';
    echo '<b>To:</b> ' . $destinatario . '<br/>';
    echo '<b>From:</b> ' . $remitente . '<br/>';
    echo '<b>Subject:</b> ' . $asunto . '<br/>';
    echo '<b>Message:</b></p>';
    echo nl2br($mensaje);
} else {
    echo '<p><strong>Se produjo un error al enviar su mensaje.</strong></p>';
}
?>
