<?php
header("Content-type: text/html");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$sEmail=$_GET['usuario'];
$conn=new mysqli("localhost","root","","legendpadel");
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
            <div class="col-xs-12"><?php echo $producto['nombre']; ?></div>
            <div class="col-xs-12"><small>Cantidad: <span><?php echo $producto['cantidad']; ?></span></small></div>
        </div>
        <div class="col-sm-3 col-xs-3 text-right">
            <h6><?php echo $producto['precio']*$producto['cantidad']; ?><span> €</span></h6>
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
            <strong>Subtotal</strong>
            <div class="pull-right"><span><?php echo round($subtotal, 2); ?></span><span> €</span></div>
        </div>
        <div class="col-xs-12">
            <small>Envío</small>
            <div class="pull-right"><span>6 €</span></div>
        </div>
    </div>
    <div class="form-group">
        <hr/>
    </div>
    <div class="form-group">
        <div class="col-xs-12">
            <strong>Total</strong>
            <div class="pull-right"><span><?php echo round(($subtotal + 6), 2); ?></span><span> €</span></div>
        </div>
    </div>
    <?php
}
?>