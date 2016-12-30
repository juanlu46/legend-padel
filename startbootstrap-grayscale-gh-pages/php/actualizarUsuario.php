<?php
header('Content-type: text/plain');
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$mysqli = new mysqli("localhost", "root", "", "legendpadel");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a la Base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
else{
    $mysqli->query("SET NAMES utf8");
    $susuario = $_REQUEST['datos'];
    $ousuario=json_decode($susuario);
    $error=true;
    $expEmail ="/^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/";
    if($ousuario->password!="") {
        $expPass = "/(?=.*[a-z])(?=.*[A-Z]).{6,15}$/";
        if(preg_match($expPass, $ousuario->password))
            $error=false;
    }
    $expNombre="/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$/";
    $expApellidos="/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$/";
    $expTelefono="/^[9|6|7][0-9]{8}$/";
    $expDni="/^[0-9]{8}[a-zA-ZñÑ]$/";

            if(preg_match($expEmail, $ousuario->email) && $error==false && preg_match($expNombre, $ousuario->nombre) && preg_match($expApellidos, $ousuario->apellidos) && preg_match($expTelefono, $ousuario->telefono) && preg_match($expDni, $ousuario->dni)){
                $sql = "UPDATE usuarios SET nombre='" . $ousuario->nombre . "',apellidos='" . $ousuario->apellidos . "',telefono='" . $ousuario->telefono . "',direccion='" . $ousuario->direccion . "', email='" . $ousuario->email . "', contraseña='" . $ousuario->password . "' where dni='".$ousuario->dni."'";
                if ($mysqli->query($sql))
                    echo "Se han actualizado los datos correctamente";
                else
                    echo "Se ha producido un error al actualizarse los datos";
            }
}
$mysqli->close();
?>