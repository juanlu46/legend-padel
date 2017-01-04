<?php
require_once 'Encriptacion.php';
header('Content-type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$mysqli = new mysqli("localhost", "root", "", "legendpadel");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a la Base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
else{
    $mysqli->query("SET NAMES utf8");
    $susuario =Encriptacion::desencriptar($_REQUEST['usuario']);
    $query="SELECT p.nombre,p.precio,l.cantidad,pe.total,di.direccion,di.localidad,.di.provincia,di.cp,di.telefono,l.id_producto FROM productos p,pedidos pe,direcciones_envio di,lote l WHERE di.dni_usuario=pe.dni_usuario and p.id=l.id_producto and pe.id_envio=di.id and l.id=pe.id_lote and pe.dni_usuario='".$susuario."'";
    $result = $mysqli->query($query);
    $res=array();
    while($array=$result->fetch_assoc()){
          $res[]=$array;
    }
    echo json_encode($res);
    
}
$mysqli->close();
?>