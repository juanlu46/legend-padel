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
    if (isset($_REQUEST['datos'])) {
        $susuario = $_REQUEST['datos'];
    } else {
        $susuario = "";
    }
    $ousuario=json_decode($susuario);

    if(empty($ousuario->dni)) {//Si el dni viene vacío, es un login no un registro
        //primero validaremos los datos de entrada

        $expEmail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/";
        $expPass = "/(?=.*[a-z])(?=.*[A-Z]).{6,15}$/";
        if (preg_match($expEmail, $ousuario->email) && preg_match($expPass, $ousuario->password)) {
            $query1 = "SELECT * FROM usuarios WHERE email='" . $ousuario->email . "' and contraseña='" . $ousuario->password . "'";
            $result = $mysqli->query($query1);
            $row_cnt = $result->num_rows;

            if ($row_cnt == 0)
                Echo "Datos incorrectos, introduzca un usuario válido";

        }
    }
    else
             {
                $expNombre="/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$/";
                $expApellidos="/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$/";
                $expTelefono="/^[9|6|7][0-9]{8}$/";
                $expDni="/^[0-9]{8}[a-zA-ZñÑ]$/";
                $expEmail="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/";
                $expPass ="/^(?=.*[a-z])(?=.*[A-Z]).{6,15}$/";
                $expCP ="/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/";

                if(preg_match($expNombre, $ousuario->nombre) && preg_match($expApellidos, $ousuario->apellidos) && preg_match($expTelefono, $ousuario->telefono) && preg_match($expDni, $ousuario->dni) && preg_match($expEmail,$ousuario->email) && preg_match($expPass,$ousuario->password) && preg_match($expCP,$ousuario->cp) && $ousuario->direccion!="" && $ousuario->provincia!="" && $ousuario->localidad!="" ){
                    $cp=intval($ousuario->cp);
                    $sql = "INSERT INTO usuarios (nombre, apellidos, dni,telefono,direccion,localidad,provincia,cp, email, contraseña) VALUES ('" . $ousuario->nombre . "','" . $ousuario->apellidos . "','" . $ousuario->dni . "','" . $ousuario->telefono . "','" . $ousuario->direccion . "', '" . $ousuario->localidad . "','" . $ousuario->provincia . "','" . $cp . "','" . $ousuario->email . "','" . $ousuario->password . "')";
                if ($mysqli->query($sql))
                    echo "Se ha dado de alta con éxito el usuario";
                else
                    echo "Se ha producido un error, este usuario ya existe";
            
                }
            }


        
    
}



?>