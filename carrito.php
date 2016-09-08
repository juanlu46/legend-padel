<?php
$sProducto=$_REQUEST['datos'];
$oProducto=json_decode($sProducto);
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
<div class="column row">
    <a href="tienda.html">Continuar comprando</a>
   
    <div class="panel callout radius">
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