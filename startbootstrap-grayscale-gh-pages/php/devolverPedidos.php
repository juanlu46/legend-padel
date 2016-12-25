<?php
header('Content-type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mysqli = new mysqli("localhost", "root", "", "legendpadel");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a la Base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
else{
    $mysqli->query("SET NAMES utf8");
    $susuario = $_REQUEST['usuario'];

    if($susuario!=NULL){
        $expEmail ="/^[A-Za-z]*[_a-z0-9-].(\.[_A-Z0-9-].)*@[a-z0-9-].(\.[a-z0-9-].)*(\.[a-z]{2,3})$/";
        $query="SELECT id,cantidad FROM carritos WHERE usuario='".$susuario."'";
        $result = $mysqli->query($query);
        $res=array();
        while($array=$result->fetch_assoc()){
            $res[]=$array;
        }
        echo json_encode($res);
    } else
        echo '<h3>Email no valido</h3>';
}
$mysqli->close();
?>