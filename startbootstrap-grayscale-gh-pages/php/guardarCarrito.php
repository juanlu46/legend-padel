<?php
$sEmail=$_GET['usuario'];
$oProductos=json_decode($_GET['carrito']);
$conn = new mysqli("localhost", "root", "", "legendpadel");
if(count($oProductos)>0) {
    $sInserts = "INSERT INTO carritos VALUES('" . $sEmail . "','" . $oProductos[0][0] . "'," . $oProductos[0][1] . ")";
    for ($i = 1; $i < count($oProductos); $i++) {
        $sInserts .= ",('" . $sEmail . "','" . $oProductos[$i][0] . "'," . $oProductos[$i][1] . ")";
    }
    $conn->query($sInserts);
}
else{
    $delete=$conn->query("DELETE FROM carritos WHERE usuario='".$sEmail."'");
}
$conn->close();