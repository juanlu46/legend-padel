<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-type: application/json");
require_once 'apiRedsys.php';
$clave="sq7HjrUOBfKmC576ILgskD5srU870gJ7";
$tpv=new RedsysAPI();
$version=$_POST["Ds_SignatureVersion"];
$parametros=$_POST["Ds_MerchantParameters"];
$signatureRecibida=$_POST["Ds_Signature"];
$paramDeco=$tpv->decodeMerchantParameters($parametros);
$signatureCalculada=$tpv->createMerchantSignatureNotif($clave,$parametros);
if($signatureCalculada===$signatureRecibida){
    $conn=new mysqli("localhost","root","","")
}
else{
    echo "Firma de notificación no válida. Acceso denegado.";
}
