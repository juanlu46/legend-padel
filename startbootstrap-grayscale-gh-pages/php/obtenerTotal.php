<?php
require_once 'Encriptacion.php';
header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$usuario=Encriptacion::desencriptar($_GET['usuario']);
$conn=new mysqli("localhost","root","","legendpadel");
$fTotal=0.0;
$select=$conn->query("SELECT (C.cantidad*P.precio) AS suma FROM carritos C, productos P WHERE C.id=P.id AND C.usuario='".$usuario."'");

while($res=$select->fetch_assoc()){
    $fTotal+=$res['suma'];
}
$fTotal=round($fTotal,2);
$fTotal="$fTotal";
$oTotal=explode(".",$fTotal);
if(strlen($oTotal[1])<2)
    $oTotal[1]=$oTotal[1]."0";
$fTotal=$oTotal[0].$oTotal[1];

$maxLote=mt_rand(0,999999);
$idLote="$maxLote";
while(strlen($idLote)<6){
    $idLote="0".$idLote;
}
$query=$conn->query("select count(*) conteo from pedidos where id_lote like '%".$idLote."'");
$res=$query->fetch_assoc()['conteo'];
while($res!=0){
    $maxLote=mt_rand(0,999999);
    $idLote="$maxLote";
    while(strlen($idLote)<6){
        $idLote="0".$idLote;
    }
    $query=$conn->query("select count(*) conteo from pedidos where id_lote like '%".$idLote."'");
    $res=$query->fetch_assoc()['conteo'];
}




echo json_encode(array("total"=>$fTotal,"id"=>$idLote));
