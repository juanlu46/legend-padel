<?php
header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$usuario=$_GET['usuario'];
$conn=new mysqli("localhost","root","","legendpadel");
$fTotal=0.0;
$select=$conn->query("SELECT (C.cantidad*P.precio) AS suma FROM carritos C, productos P WHERE C.id=P.id AND C.usuario='".$usuario."'");
while($res=$select->fetch_assoc()){
    $fTotal+=$res['suma'];
}
$select2=$conn->query("SELECT MAX(id_lote) AS lote FROM pedidos");
$maxLote=$select2->fetch_assoc()['lote'];
$idLote=substr($maxLote,6);
$fTotal=round($fTotal,2);
echo json_encode(array("total"=>$fTotal,"id"=>$idLote));
