<?php
require_once 'Encriptacion.php';
header("Content-type: text/html");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$sEmail=Encriptacion::desencriptar($_GET['usuario']);
$conn=new mysqli("localhost","mylegendpa","5nm6D092","legendpadel");
$select=$conn->query("SELECT c.id, c.cantidad, p.nombre, p.precio FROM carritos c, productos p WHERE p.id=c.id AND c.usuario='".$sEmail."'");
$subtotal=0;
$resultados=false;
while($producto=$select->fetch_assoc()){
    $resultados=true;
    $subtotal+=($producto['precio']*$producto['cantidad']);
    ?>
    <div class="form-group">
        <div class="col-sm-3 col-xs-3">
            <img class="img-responsive" alt="foto_producto" src="../img/imgProduct/<?php echo $producto['id']; ?>.jpg" ></img>
        </div>
        <div class="col-sm-6 col-xs-6">
            <div class="col-xs-12 titulo-producto"><strong><?php echo $producto['nombre']; ?></strong></div>
            <div class="col-xs-12 mediano">Cantidad: <span><strong><?php echo $producto['cantidad']; ?></strong></span></div>
        </div>
        <div class="col-sm-3 col-xs-3 text-right">
            <h4><?php echo $producto['precio']*$producto['cantidad']; ?><span> €</span></h4>
        </div>
    </div>
<?php
}
if($resultados) {
    ?>
    <div class="form-group">
        <hr/>
    </div>
    <div class="form-group">
        <div class="col-xs-12">
            <span class="grande">Subtotal</span>
            <div class="pull-right mediano"><strong><?php echo round($subtotal, 2); ?></strong><strong> €</strong></div>
        </div>
        <div class="col-xs-12 mediano">
            <strong>Envío</strong>
            <div class="pull-right"><strong>6 €</strong></div>
        </div>
    </div>
    <div class="form-group">
        <hr/>
    </div>
    <div class="form-group">
        <div class="col-xs-12">
            <strong class="grande">Total</strong>
            <div class="pull-right grande"><strong><?php echo round(($subtotal + 6), 2); ?></strong><strong> €</strong></div>
        </div>
    </div>
    <?php
}
?>