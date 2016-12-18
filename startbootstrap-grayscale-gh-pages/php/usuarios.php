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
    if (isset($_REQUEST['datos'])) {
        $susuario = $_REQUEST['datos'];
    } else {
        $susuario = "";
    }
    $ousuario=json_decode($susuario);

    if(!empty($ousuario->email)){//Si el dni viene vacío, es un login no un registro
        //primero validaremos los datos de entrada

        $expEmail ="/^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/";
        $expPass = "/(?=.*[a-z])(?=.*[A-Z]).{6,15}$/";
        if(preg_match($expEmail, $ousuario->email) && preg_match($expPass, $ousuario->password)){
           $query1="SELECT * FROM usuarios WHERE email='".$ousuario->email."' and contraseña='".$ousuario->password."'";
            $result = $mysqli->query($query1);
            $row_cnt = $result->num_rows;
            
            if($row_cnt==0)
                Echo "Datos incorrectos, introduzca un usuario válido";
            
        }
        else {
            $sql = "INSERT INTO usuarios (nombre, apellidos, dni,telefono,direccion, email, contraseña) VALUES ('".$ousuario->nombre."','".$ousuario->apellidos."','".$ousuario->dni."','".$ousuario->telefono."','".$ousuario->direccion."','".$ousuario->email."','".$ousuario->password."')";
             if ($mysqli->query($sql))
                echo "Se ha dado de alta con éxito el usuario";
            else
                echo "Se ha producido un error, este usuario ya existe";
        }
        } else {
            echo '<p>Email no valido</p>';
        }



}



?>