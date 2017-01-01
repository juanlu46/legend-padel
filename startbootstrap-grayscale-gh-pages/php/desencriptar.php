<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$cadena = $_REQUEST['cadena'];
  $key='padelegend$01';  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
  $decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($cadena), MCRYPT_MODE_CBC, md5(md5($key))), "\0");
  echo $decrypted;  //Devuelve el string desencriptado