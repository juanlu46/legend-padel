$(document).ready(inicio);

function inicio(){
    if(sessionStorage.getItem("lgdusr")==null){
        if(sessionStorage.getItem("nusrcrt")!=null){
            sCarrito=sessionStorage.getItem("nusrcrt");
            $.get("../php/montarCarrito.php",sCarrito,function(oProductos){
                $('#productos').find('tr').first().before(oProductos);
                aplicarManejadoresBoton();
            },'html');
        }
        else{
            noProductos();
        }
    }
    else{

    }
}

function noProductos(){
    $('#productos').find('tr').first().before('<tr> <td colspan="5" class="col-sm-8 col-md-6"> <h1 class="text-center">No hay productos en el carrito</h1> </td> </tr>');
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
    $(".productos").each(function(){
        id=$(this).data('id');
        cantidad=$(this).find('.cantidad_producto').val();
        arrayProductos.push([id,cantidad]);
    });
    sCarrito=JSON.stringify(arrayProductos);
    if(sessionStorage.getItem("lgdusr")==null){
        sessionStorage.setItem("nusrcrt",sCarrito);
    }
    else{
        sSesion=sessionStorage.getItem("lgdusr");
        $.get('php/montarCarrito.php',sSesion,function(sProductos){
            $('#productos').find('tr').first().before(sProductos);
        });
    }
}
