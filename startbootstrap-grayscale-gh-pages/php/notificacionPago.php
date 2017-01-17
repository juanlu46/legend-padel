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
    $conn=new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
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
        $oUsu=$conn->query("select dni,nombre from usuarios where email='".$pedidoTemp['usuario']."'")->fetch_assoc();
        $user_dni=$oUsu['dni'];
        $select_carrito=$conn->query("select id,cantidad from carritos where usuario='".$pedidoTemp['usuario']."'");
        $mensajeHTML='<html><head><title>Su pedido</title><style>body {width: 99%;height: 100%;font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;color: white;background-color: black;}html {width: 100%;height: 100%;}h1,h2,h3,h5,h6 {margin: 0 0 35px;text-transform: uppercase;font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;font-weight: 700;letter-spacing: 1px;text-align: center;}p{font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;margin-bottom: 20px;}ol li, ul li{margin-bottom: 20px;}.logo-legend-txt{width: 93px;margin-top: -8px;display: inline-block !important;}.logo-legend-img{width: 51px;margin-top: -14px;margin-left: -13px;}.contenidoDevoluciones{overflow: auto;border-radius: 2px;margin-left: 2em;background-color: #e7e5e4;padding: 1em;color: black;}.contenidoDevoluciones a{color:#9f0606 ;}.producto,.envio {list-style: none;font-size: 2em;}.num_pedido, .nombre{color: #98050e;}</style></head><body><div class="contenedor contenedorDevoluciones"><div class="row"><div class="col-md-12 col-lg-12  cabeceraDevoluciones"><a class="navbar-brand page-scroll" href="../index.html"><img class="logo-legend-txt" src="http://www.legendpadel.com/img/logo-lgn-txt.png" alt="logo legend padel texto"/><img class="logo-legend-img" src="http://www.legendpadel.com/img/logo-lgn-img.png" alt="logo legend padel imagen"/></a></div></div><hr><div class="row"><h2>AQUÍ TIENES TU PEDIDO</h2><h3>Echa un vistazo '.$oUsu['nombre'].'</h3><div class="medium-10 small-10 large-10 columns contenidoDevoluciones">';
        $mensajeHTML.='<div class="productos"><h4>Número de pedido: <strong class="num_pedido">'.$codPedido.'</strong></h4><ul class="pedido">';
        while($res=$select_carrito->fetch_assoc()){
            $producto=$conn->query("select nombre, precio from productos where id='".$res['id']."'")->fetch_assoc();
            $insert=$conn->query("insert into lote values(".$codPedido.",'".$res['id']."',".$res['cantidad'].")");
            $mensajeHTML.='<li class="producto"><strong class="cantidad">'.$res['cantidad'].'x</strong> <span class="nombre">'.$producto['nombre'].
                '</span> <strong class="precio">'.($producto['precio']*$res['cantidad']).' €</strong></li>';
        }
        $insert2=$conn->query("insert into pedidos values(".$codPedido.",'".$user_dni."',".$total.",".$pedidoTemp['id_direccion'].")");
        $selectDireccion=$conn->query("select direccion,localidad,provincia,cp,telefono from direcciones_envio where id=".$pedidoTemp['id_direccion']."");
        $mensajeHTML.='</ul></div><div class="envio_c"><h5>Dirección de envio:</h5><ul>';
        $resEnvio=$selectDireccion->fetch_assoc();
        $mensajeHTML.='<li class="envio"><strong>Dirección: </strong>'.$resEnvio['direccion'].'</li>';
        $mensajeHTML.='<li class="envio"><strong>Localidad: </strong>'.$resEnvio['localidad'].'</li>';
        $mensajeHTML.='<li class="envio"><strong>Provincia: </strong>'.$resEnvio['provincia'].'</li>';
        $mensajeHTML.='<li class="envio"><strong>CP: </strong>'.$resEnvio['cp'].'</li>';
        $mensajeHTML.='<li class="envio"><strong>Teléfono: </strong>'.$resEnvio['telefono'].'</li>';
        $mensajeHTML.='</ul></div></div></div></div></body></html>';
        $cabeceras = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $cabeceras .= 'From: Legend Padel<info@legendpadel.com>';
        $enviado = mail($pedidoTemp['usuario'], 'Tu pedido '.$codPedido.' LEGEND PADEL', $mensajeHTML, $cabeceras);
        $enviado = mail('info@legendpadel.com', '[LegendPadel]Pedido '.$codPedido.' realizado por cliente', $mensajeHTML, $cabeceras);
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
