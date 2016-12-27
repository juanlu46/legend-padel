<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
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
