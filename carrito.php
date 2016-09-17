<?php
header('Content-Type: text/html; charset=UTF-8');
$mysqli = new mysqli('127.0.0.1', 'root', '', 'LegendPadel');
if ($mysqli->connect_errno) {
    //EDITAR ARCHIVO PHP.INI PARA ELIMINAR LOS WARNING Y ERRORES DE PHP
    echo "<h3>Lo sentimos, el sitio web está experimentando problemas.</h3>";
    exit();
}else{
if(isset($_REQUEST['datos'])){
    $sProducto=$_REQUEST['datos'];
    $oProducto = json_decode($sProducto);

}else {
    $cestaVacia='<h3>Cesta vacía</h3><p>En la cesta de compra puedes dejar temporalmente los productos que quieres. En ella aparecerá el precio más reciente de cada producto.</p><a href="tienda.html">Añade algún producto</a></p>';
}
?>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Legend Padel | Carrito</title>
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/estilo.css"/>
</head>
<body>
<div class="column row contenidoCarrito">
    <a href="index.html">Volver</a>
   
    <div class="panel callout radius">
        <?php
        if(isset($cestaVacia)){
            echo $cestaVacia;
        }else{
        ?>
        <table>
            <thead>
            <tr>
                <td width="150">Producto</td>
                <td width="150">Cantidad</td>
                <td width="150">Precio</td>
                <td width="150">Envío</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="producto"><?php 
                    if(isset($oProducto)){
                     $oProducto->producto;
                    }
                    ?><p>Color:<span class="color"></span> </p></td>
                <td class="cantidad">This is longer conteeget metus.</td>
                <td class="precio">  Content Goes Here</td>
                <td><a href=""> Eliminar</a></td>
            </tr>
            </tbody>
        </table>

    </div>
    <a href="#" class="button expand comprar">Comprar</a>
    <?php } ?>
</div>

<script src="js/jquery-2.2.0.min.js"></script>
<script src="js/foundation.js"></script>
<script src="js/productos.js"></script>
<script src="js/principal.js"></script>
<script>
    $(document).foundation();
</script>
</body>
</html>
<?php
}
$mysqli->close();
?>