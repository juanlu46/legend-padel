<?php
require_once 'Encriptacion.php';
header("Content-type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$usuario=Encriptacion::desencriptar($_GET['usuario']);
$conn=new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
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
$query2=$conn->query("select count(*) conteo from pedidos_temp where id_lote like '".$idLote."'");
$res2=$query2->fetch_assoc()['conteo'];
while($res!=0 || $res2!=0){
    $maxLote=mt_rand(0,999999);
    $idLote="$maxLote";
    while(strlen($idLote)<6){
        $idLote="0".$idLote;
    }
    $query=$conn->query("select count(*) conteo from pedidos where id_lote like '%".$idLote."'");
    $res=$query->fetch_assoc()['conteo'];
    $query2=$conn->query("select count(*) conteo from pedidos_temp where id_lote like '%".$idLote."'");
    $res2=$query2->fetch_assoc()['conteo'];
}

$hoy=getdate();
$anno=$hoy['year'];
$anno="$anno";
$mes=$hoy['mon'];
$mes="$mes";
if(strlen($mes)<2)
    $mes='0'.$mes;
$idLote=$anno.$mes.$idLote;
$query_cliente=$conn->query("select dni from usuarios where email='".$usuario."'");
$dni_usuario=$query_cliente->fetch_assoc()['dni'];
$maxIDDirecccion=$conn->query("select max(id)+1 maximo from direcciones_envio")->fetch_assoc()['maximo'];
$insert=$conn->query("insert into direcciones_envio(id,direccion,localidad,provincia,cp,telefono,dni_usuario) values(".$maxIDDirecccion.",'".$_GET['direccion']."','".$_GET['localidad'].
    "','".$_GET['provincia']."',".$_GET['cp'].",".$_GET['telefono'].",'".$dni_usuario."')");
$insert2=$conn->query("insert into pedidos_temp values(".$idLote.",".$maxIDDirecccion.",'".$usuario."')");

$conn->close();
echo json_encode(array("total"=>$fTotal,"id"=>$idLote));
