<?php
require_once 'Encriptacion.php';
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
$sEmail=Encriptacion::desencriptar($_GET['usuario']);
$conn=new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
$conn->query("SET NAMES utf8");
$select=$conn->query("SELECT direccion, localidad, provincia, cp, telefono FROM usuarios WHERE email='".$sEmail."'");

while($array=$select->fetch_assoc()){
    $usuario='{'.
        '"direccion":"'.$array["direccion"].'",'.
        '"localidad":"'.$array["localidad"].'",'.
        '"provincia":"'.$array["provincia"].'",'.
        '"cp":"'.$array["cp"].'",'.
        '"telefono":"'.$array["telefono"].'"'.
        '}';
}
echo $usuario;
$conn->close();
