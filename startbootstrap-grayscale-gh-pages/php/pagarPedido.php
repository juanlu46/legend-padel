<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
require_once 'apiRedsysWs.php';
$urlNoti=""; //url de notificacion de pago
$tpv=new RedsysAPIWs;
$tpv->setParameter("DS_MERCHANT_AMOUNT",$_GET['cantidad']);
$tpv->setParameter("DS_MERCHANT_ORDER",$_GET['id']);
$tpv->setParameter("DS_MERCHANT_MERCHANTCODE",126590918);
$tpv->setParameter("DS_MERCHANT_CURRENCY",978);
$tpv->setParameter("DS_MERCHANT_TERMINAL",002);
$tpv->setParameter("DS_MERCHANT_TRANSACTIONTYPE",0);
$tpv->setParameter("DS_MERCHANT_MERCHANTURL",$urlNoti);
$parametros=$tpv->createMerchantParameters();