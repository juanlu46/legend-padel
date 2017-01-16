<?php
require_once 'Encriptacion.php';
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$sEmail=Encriptacion::desencriptar($_GET['usuario']);
$oProductos=json_decode($_GET['carrito']);
$conn = new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
$delete=$conn->query("DELETE FROM carritos WHERE usuario='".$sEmail."'");
if(count($oProductos)>0) {
    $sInserts = "INSERT INTO carritos VALUES('" . $sEmail . "','" . $oProductos[0][0] . "'," . $oProductos[0][1] . ")";
    for ($i = 1; $i < count($oProductos); $i++) {
        $sInserts .= ",('" . $sEmail . "','" . $oProductos[$i][0] . "'," . $oProductos[$i][1] . ")";
    }
    $conn->query($sInserts);
}
$conn->close();