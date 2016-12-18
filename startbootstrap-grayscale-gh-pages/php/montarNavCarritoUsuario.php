<?php
header("Content-type: text/html");
$sEmail=$_GET['usuario'];
$conn=new mysqli("localhost","root","","legendpadel");
$select=$conn->query("SELECT nombre,p.id id,precio,cantidad FROM productos p, carritos c WHERE p.id=c.id AND usuario='".$sEmail."'");
while($res=$select->fetch_assoc()) {
    $fTotal=$res['precio']*$res['cantidad'];
    ?>
    <li class="item_carrito" data-id="<?php echo $res['id']; ?>">
        <span class="item">
            <span class="item-left">
                <img src="img/imgProduct/<?php echo $res['id']; ?>.jpg" alt="articulo_carrito"></img>
                <span class="item-info">
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
?>
