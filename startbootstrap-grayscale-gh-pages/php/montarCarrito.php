<?php
header("Content-type: text/html");
$oProductos=json_decode($_GET['carrito']);
$conn=new mysqli("localhost","root","","legendpadel");
$nProductos=count($oProductos);
if($nProductos>0) {
    $sInClause = "'" . $oProductos[0][0] . "'";
    $oCantidades[$oProductos[0][0]] = $oProductos[0][1];
    for ($j = 1; $j < $nProductos; $j++) {
        $sInClause .= ",'" . $oProductos[$j][0] . "'";
        $oCantidades[$oProductos[$j][0]] = $oProductos[$j][1];
    }
    $select = $conn->query("SELECT nombre,id,precio,stock FROM productos WHERE id IN (" . $sInClause . ")");
    $sStock = "";
    while ($res = $select->fetch_assoc()) {
        if ($res['stock'] > 5) {
            $sStock = "stock text-success\">Disponible";
        } elseif ($res['stock'] <= 0) {
            $sStock = "stock text-danger\">No quedan";
        } else {
            $sStock = "stock text-warning\">Pocas unidades";
        }
        $fTotal = $res['precio'] * $oCantidades[$res['id']];
        ?>
        <tr class="producto" data-id="<?php echo $res['id']; ?>" data-precio="<?php echo $res['precio']; ?>">
            <td class="col-sm-8 col-md-6">
                <div class="media">
                    <a class="thumbnail pull-left" href="../productos.html?<?php echo $res['id']; ?>"> <img
                            class="media-object" src="../img/imgProduct/<?php echo $res['id']; ?>.jpg"
                            alt="icono producto"> </a>
                    <div class="media-body">
                        <h4 class="media-heading"><a href="" class="nombre_producto"><?php echo $res['nombre']; ?></a>
                        </h4>
                        <h5 class="media-heading"> by <a href="#" class="marca">Legend Padel</a></h5>
                        <span>Stock: </span><span><strong class="<?php echo $sStock; ?>"</strong></span>
                </div>
            </div>
        </td>
        <td class=" col-sm-1 col-md-1 text-center">
            <input type="number" class="form-control cantidad_producto" value="<?php echo $oCantidades[$res['id']]; ?>"
                   min="1"/>
            </td>
            <td class="col-sm-1 col-md-1 text-center"><strong class="precio"><?php echo $res['precio']; ?> €</strong>
            </td>
            <td class="col-sm-1 col-md-1 text-center"><strong class="total_producto"><?php echo $fTotal; ?> €</strong>
            </td>
            <td class="col-sm-1 col-md-1">
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Eliminar
                </button>
            </td>
        </tr>
        <?php
    }
    $conn->close();
}
?>