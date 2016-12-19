$(document).ready(inicio);

function inicio(){
    if(sessionStorage.getItem("lgdusr")==null){
        if(sessionStorage.getItem("nusrcrt")!=null){
            sCarrito=sessionStorage.getItem("nusrcrt");
            $.get("../php/montarCarrito.php?carrito="+encodeURIComponent(sCarrito),function(oProductos){
                $('#productos').find('tr').first().before(oProductos);
                aplicarManejadoresBoton();
                calcularTotales();
            },'html');
        }
        else{
            noProductos();
        }
    }
    else{
        sSesion=sessionStorage.getItem("lgdusr");
        $.get('php/montarCarritoUsuario.php?usuario='+encodeURIComponent(sSesion),function(sProductos){
            $('#productos').find('tr').first().before(sProductos);
            calcularTotales();
        });
    }
    $('.btn-continuar-compra').on('click',function(){
        location.href="http://www.legendpadel.com/index.html#tienda";
    });
}

function noProductos(){
    $('#productos').find('tr').first().before('<tr> <td colspan="5" class="col-sm-8 col-md-6"> <h1 class="text-center">No hay productos en el carrito</h1> </td> </tr>');
    $(".envio_carrito").text("0 €");
}

function aplicarManejadoresBoton(){
    $(".producto").each(function(){
        oProducto=$(this);
        $(this).find("button").on('click',function(){
            oProducto.remove();
            guardarCarrito();
        });
    });
}

function guardarCarrito(){
    arrayProductos=[];
    $(".producto").each(function(){
        id=$(this).data('id');
        cantidad=$(this).find('.cantidad_producto').val();
        arrayProductos.push([id,cantidad]);
    });
    var sCarrito = JSON.stringify(arrayProductos);
    if(sessionStorage.getItem("lgdusr")==null){
        sessionStorage.setItem("nusrcrt",sCarrito);
    }
    else{
        sSesion=sessionStorage.getItem("lgdusr");
        $.get('php/guardarCarrito.php?usuario='+encodeURIComponent(sSesion)+'&carrito='+encodeURIComponent(sCarrito));
    }
}

function calcularTotales(){
    var fSubTotal=0.0;
    $(".total_producto").each(function(){
        fSubTotal+=parseFloat($(this).text());
    });
    $(".subtotal_carrito").text(fSubTotal.toFixed(2)+" €");
    $(".total_carrito").text((fSubTotal+6).toFixed(2)+" €");
}
