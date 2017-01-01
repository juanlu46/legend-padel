<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$cadena = $_REQUEST['cadena'];
$key='padelegend$01';  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $cadena, MCRYPT_MODE_CBC, md5(md5($key))));
echo $encrypted; //Devuelve el string encriptado