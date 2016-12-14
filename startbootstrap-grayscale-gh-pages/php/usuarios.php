<?php
header('Content-Type: application/javascript');
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
    if(!isset($ousuario->dni)){//Si no contiene dni, es un login no un registro
        $mensaje = "$(\"<div data-dismiss='alert' class='alert alert-success' role='alert' title='Error login'>";
        $query1="SELECT * FROM usuarios WHERE email='".$ousuario->email."' and contraseña='".$ousuario->password."'";
        $result = $mysqli->query($query1);
            $row_cnt = $result->num_rows;
        echo $row_cnt;
            if($row_cnt==0)
                Echo "Datos incorrectos, introduzca un usuario válido";
                //$mensaje .= "Datos incorrectos, introduzca un usuario válido</div>\").alert();";
             }
    else {
        $sql = "INSERT INTO 'usuarios' ('nombre', 'apellidos', 'dni', 'email', 'contraseña') VALUES (" . $ousuario->nombre . ", " . $ousuario->apellidos . ", " . $ousuario->dni . ", " . $ousuario->email . ", " . $ousuario->password . ")";
           // $mensaje = "$(\"<div  class='alert alert-success' role='alert' title='Alta usuario'>";
        if ($mysqli->query($sql))
            echo "Se ha dado de alta con éxito el usuario";
            //$mensaje .= "Se ha dado de alta con éxito el usuario" . "</div>\").alert();";
        else
            echo "Se ha producido un error: ";
           // $mensaje .= "Se ha producido un error: " . $mySQLi->errno . "-" . $mySQLi->error . "</div>\").alert();";
    }

}



?>