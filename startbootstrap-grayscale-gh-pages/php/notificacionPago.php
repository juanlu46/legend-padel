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
    $conn=new mysqli("localhost","root","","legendpadel");
    $codResp=$tpv->getParameter("Ds_Response");
    $codResp=(int)$codResp;
    $codPedido=$tpv->getParameter("Ds_Order");
    $total=$tpv->getParameter("Ds_Amount");
    $total="$total";
    $longitudTotal=strlen($total);
    $total=substr($total,0,($longitudTotal-2)).".".substr($total,-2);
    if($codResp >= 0 && $codResp <=99){
        $select=$conn->query("select usuario,id_direccion from pedidos_temp where id_lote=".$codPedido);
        $pedidoTemp=$select->fetch_assoc();
        $user_dni=$conn->query("select dni from usuarios where email='".$pedidoTemp['usuario']."'")->fetch_assoc()['dni'];
        $select_carrito=$conn->query("select id,cantidad from carritos where usuario='".$pedidoTemp['usuario']."'");
        while($res=$select_carrito->fetch_assoc()){

            $insert=$conn->query("insert into lote values(".$codPedido.",'".$res['id']."',".$res['cantidad'].")");
        }
        $insert2=$conn->query("insert into pedidos values(".$codPedido.",'".$user_dni."',".$total.",".$pedidoTemp['id_direccion'].")");

    }
    else{
        echo "Transcacción fallida.";
    }
    $delete=$conn->query("DELETE FROM direcciones_envio WHERE id IN (SELECT id_direccion FROM pedidos_temp WHERE id_lote=".$codPedido.")");
    $conn->close();
}
else{
    echo "Firma de notificación no válida. Acceso denegado.";
}
