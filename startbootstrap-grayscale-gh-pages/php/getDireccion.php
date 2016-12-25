<?php
$sEmail=$_GET['usuario'];
header('Content-Type: application/json');
$conn=new mysqli("loclahost","root","","legendpadel");
$select=$conn->query("SELECT direccion, localidad, provincia, cp, telefono FROM usuarios WHERE email='".$sEmail."'");
echo json_encode($select->fetch_assoc());
$conn->close();
