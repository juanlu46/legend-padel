<?php
require_once 'Encriptacion.php';
header('Content-type: text/html');
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$mysqli = new mysqli("localhost","root","","legendpadel");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a la Base de datos: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
else{
    $mysqli->query("SET NAMES utf8");
    $susuario =Encriptacion::desencriptar($_REQUEST['usuario']);

    $queryPedidos="SELECT * FROM pedidos where dni_usuario='".$susuario."'";
    $result = $mysqli->query($queryPedidos);
    while($array=$result->fetch_assoc()) {
        ?><i href="#" class="list-group-item active pedido<?php echo $array['id_lote'];?>" style="overflow: auto;font-size:14px;margin-top:30px;">
        <div class="col-xs-12 col-md-6 col-lg-6">
            <p><h2 style="font-weight: bold;font-family: 'Roboto Condensed';">Productos</h2></p>
            <ul style="list-style: none;font-size: 20px;">
                <?php
                $querylotes="SELECT * FROM lote where id='".$array['id_lote']."'";
                $result2 = $mysqli->query($querylotes);
                while($array2=$result2->fetch_assoc()) {
                    $selectProductos="SELECT nombre from PRODUCTOS WHERE ID='".$array2['id_producto']."'";
                    $result3 = $mysqli->query($selectProductos);
                    $array3=$result3->fetch_assoc();?>
                        <li><h3 class="list-group-item-heading" style="font-size: 17px;"><?php echo $array2['cantidad'].'x '.$array3['nombre'];?></h3></li>
                    <?php
                } ?>
            </ul>
        </div>
        <div class="col-xs-12 col-md-6 col-lg-6">
        <?php
        $queryDireccion="select direccion,localidad,provincia,cp,telefono from direcciones_envio where dni_usuario='".$susuario."'";
        $result4 = $mysqli->query($queryDireccion);
        $direccion=$result4->fetch_assoc();?>

            <p class="text-left" style="font-weight: bold;font-size: 16px;">Su pedido se enviará a la siguiente dirección:</p>
            <p class="text-left"><strong>Dirrección: </strong><?php echo $direccion['direccion'];?> </p>
            <p class="text-left"><strong>Provincia: </strong> <?php echo $direccion['provincia'];?> </p>
            <p class="text-left"><strong>Localidad: </strong><?php echo $direccion['localidad'];?> </p>
            <p class="text-left"><strong>Código postal: </strong> <?php echo  $direccion['cp'];?> </p>
            <p class="text-left"><strong>Teléfono: </strong><?php echo $direccion['telefono'];?></p>
            <p class="text-left"><strong>Total del pedido: </strong><?php echo $array['total'];?></p>
        </div>
        </i>
    <?php }
}

$mysqli->close();
?>