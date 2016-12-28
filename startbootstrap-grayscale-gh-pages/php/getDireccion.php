<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$sEmail=$_GET['usuario'];
header('Content-Type: application/json');
$conn=new mysqli("localhost","root","","legendpadel");
$select=$conn->query("SELECT direccion, localidad, provincia, cp, telefono FROM usuarios WHERE email='".$sEmail."'");
echo json_encode($select->fetch_assoc());
$conn->close();
