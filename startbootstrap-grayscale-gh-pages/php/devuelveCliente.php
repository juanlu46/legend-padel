<?php
header('Content-type: text/plain');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
$mysqli = new mysqli("localhost", "root", "", "legendpadel");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a la Base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
else{
    $mysqli->query("SET NAMES utf8");
     $susuario = $_REQUEST['emailUser'];

    if($susuario!=NULL){
        $expEmail ="/^[A-Za-z]*[_a-z0-9-].(\.[_A-Z0-9-].)*@[a-z0-9-].(\.[a-z0-9-].)*(\.[a-z]{2,3})$/";
        $query="SELECT * FROM usuarios WHERE email='".$susuario."'";
        $result = $mysqli->query($query);


        while($array=$result->fetch_assoc()){
            $usuario='{'.
                '"nombre":"'.$array["nombre"].'",'.
                '"apellidos":"'.$array["apellidos"].'",'.
                '"telefono":"'.$array["telefono"].'",'.
                '"direccion":"'.$array["direccion"].'",'.
                '"dni":"'.$array["dni"].'",'.
                '"email":"'.$array["email"].'",'.
                '"password":"'.$array["contraseña"].'"'.
                '}';

        }

         
            
        echo $usuario;

    } else 
        echo '<p>Email no valido</p>';
}

?>