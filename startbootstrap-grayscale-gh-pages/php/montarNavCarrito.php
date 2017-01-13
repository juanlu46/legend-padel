<?php
require_once 'Encriptacion.php';
header("Content-type: text/html");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$oProductosEncriptados=$_GET['carrito'];
$oProductos=Encriptacion::desencriptar($oProductosEncriptados);
$oProductos=json_decode($oProductos);
$conn=new mysqli("localhost","root","","legendpadel");
if(count($oProductos)>0) {
    $sInClause = "'" . $oProductos[0][0] . "'";
    $oCantidades[$oProductos[0][0]] = $oProductos[0][1];
    $nProductos = count($oProductos);
    for ($j = 1; $j < $nProductos; $j++) {
        $sInClause .= ",'" . $oProductos[$j][0] . "'";
        $oCantidades[$oProductos[$j][0]] = $oProductos[$j][1];
    }
    $select = $conn->query("SELECT nombre,id,precio FROM productos WHERE id IN (" . $sInClause . ")");
    while ($res = $select->fetch_assoc()) {
        $fTotal = $res['precio'] * $oCantidades[$res['id']];
        ?>
        <li class="item_carrito" data-id="<?php echo $res['id']; ?>">
        <span class="item">
            <span class="item-left">
                <img src="img/imgProduct/<?php echo $res['id']; ?>.jpg" alt="articulo_carrito"></img>
                <span class="item-info">
                    <span class="item_cantidad"><?php echo $oCantidades[$res['id']]; ?>x</span>
                    <span class="item_name"><?php echo $res['nombre']; ?></span>
                    <span class="item_precio"><?php echo $fTotal ?></span>
                </span>
            </span>
            <span class="item-right">
                <button class="btn btn-xs btn-danger pull-right">x</button>
            </span>
        </span>
        </li>
        <?php
    }
    $conn->close();
}
?>
