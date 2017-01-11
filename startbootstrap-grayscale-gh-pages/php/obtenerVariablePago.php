<?php
require_once 'apiRedsys.php';
require_once 'Encriptacion.php';
header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$oParametros=Encriptacion::desencriptar($_GET['data']);
$oParametros=json_decode($oParametros);
$urlNoti="http://localhost/legend-padel/php/notificacionPago.php"; //url de notificacion de pago
$urlOk="http://localhost/legend-padel/html/resultado_pago.html?ok=true&id=".$oParametros->id; //Url de legendpadel.com para pago OK
$urlKo="http://localhost/legend-padel/html/resultado_pago.html?ok=false"; //Url de legendpadel.com para fallo de pago (ko)
$clave="sq7HjrUOBfKmC576ILgskD5srU870gJ7";
$merchantCode=126590918;
$currency=978;
$terminal=002;
$tipoTransaccion=0;
$tpv=new RedsysAPI;
$tpv->setParameter("DS_MERCHANT_AMOUNT",$oParametros->cantidad);
$tpv->setParameter("DS_MERCHANT_ORDER",$oParametros->id);
$tpv->setParameter("DS_MERCHANT_MERCHANTCODE",$merchantCode);
$tpv->setParameter("DS_MERCHANT_CURRENCY",$currency);
$tpv->setParameter("DS_MERCHANT_TERMINAL",$terminal);
$tpv->setParameter("DS_MERCHANT_TRANSACTIONTYPE",$tipoTransaccion);
$tpv->setParameter("DS_MERCHANT_MERCHANTURL",$urlNoti);
$tpv->setParameter("DS_MERCHANT_PRODUCTDESCRIPTION",$oParametros->descripcion);
$tpv->setParameter("DS_MERCHANT_TITULAR",$oParametros->titular);
$tpv->setParameter("DS_MERCHANT_URLOK",$urlOk);
$tpv->setParameter("DS_MERCHANT_URLKO",$urlKo);
$tpv->setParameter("DS_MERCHANT_MERCHANTNAME","LEGEND Padel");
$tpv->setParameter("DS_MERCHANT_PAN",$oParametros->num_tarjeta);
$tpv->setParameter("DS_MERCHANT_EXPIRYDATE",$oParametros->cad_tarjeta);
$tpv->setParameter("DS_MERCHANT_CVV2", $oParametros->cvv_tarjeta);
$parametros=$tpv->createMerchantParameters();
$signature=$tpv->createMerchantSignature($clave);
echo json_encode(array("signature"=>$signature,"parametros"=>$parametros));


