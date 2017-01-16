<?php
require_once 'Encriptacion.php';
header("Content-type: text/html");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$sEmail=Encriptacion::desencriptar($_GET['usuario']);
$conn=new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
$select=$conn->query("SELECT nombre,p.id id,precio,stock,cantidad FROM productos p, carritos c WHERE p.id=c.id AND usuario='".$sEmail."'");
$sStock="";
while($res=$select->fetch_assoc()) {
    if($res['stock']>5){
        $sStock="stock text-success\">Disponible";
    }
    elseif($res['stock']<=0){
        $sStock="stock text-danger\">No quedan";
    }
    else{
        $sStock="stock text-warning\">Pocas unidades";
    }
    $fTotal=$res['precio']*$res['cantidad'];
    ?>
    <tr class="producto" data-id="<?php echo $res['id']; ?>" data-precio="<?php $res['precio']; ?>">
        <td class="col-sm-8 col-md-6">
            <div class="media">
                <a class="thumbnail pull-left" href="#"> <img class="media-object" src="../img/imgProduct/<?php echo $res['id']; ?>.jpg" alt="icono producto"> </a>
                <div class="media-body">
                    <h4 class="media-heading"><a href="" class="nombre_producto"><?php echo $res['nombre']; ?></a></h4>
                    <h5 class="media-heading"> by <a href="#" class="marca">Legend Padel</a></h5>
                    <span>Stock: </span><span><strong class=<?php echo $sStock; ?></strong></span>
                </div>
            </div>
        </td>
        <td class="col-sm-1 col-md-1 text-center">
            <input type="number" class="form-control cantidad_producto" value="<?php echo $res['cantidad']; ?>" min="1"/>
        </td>
        <td class="col-sm-1 col-md-1 text-center"><strong class="precio"><?php echo $res['precio']; ?></strong></td>
        <td class="col-sm-1 col-md-1 text-center"><strong class="total_producto"><?php echo $fTotal; ?></strong></td>
        <td class="col-sm-1 col-md-1">
            <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Eliminar
            </button>
        </td>
    </tr>
    <?php
}
$conn->close();
?>