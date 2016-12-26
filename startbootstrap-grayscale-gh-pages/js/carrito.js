$(document).ready(inicio);

function inicio(){
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
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

function cargarFormIdent(){
    $('.btn-cerrar-login').on('click',function(){
        return false;
    });
    var inputEmail=$("#inputEmail");
    inputEmail.val("");
    $("#inputPassword").val("");
    $('.ContentLogin').css('display','block');
    $('.desenfoque').css('display','block');
    if(sessionStorage.getItem('lgdusr')!=null){
        inputEmail.val(sessionStorage.getItem('lgdusr'));
    }
    if(localStorage.getItem('lgdusr')!=null ){
        inputEmail.val(localStorage.getItem('lgdusr'));
    }

}
/* JS DE LOGIN */
function validarLogin(){
    var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
    var email=$("#inputEmail").val();
    var mendaje=$(".mensaje");

    //Verifica la existencia de una letra minuscula(?=.*[a-z])  y (?=.*[A-Z]) la de una letra en mayusculas.
// Por ultimo la longitud la verificamos con los valores entre llaves {6,15}.
    var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");
    var password=$("#inputPassword").val();
    if(!expEmail.test(email) && !expPass.test(password)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Email y Contraseña Incorrectos');
        mendaje.css('display', 'block');
    }
    else if(!expPass.test(password)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Contraseña Incorrecta');
        mendaje.css('display','block');
    }
    else  if(!expEmail.test(email)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Email Incorrecto');
        mendaje.css('display','block');
    }
    else{
        var  arrayJson='{"email":"'+email+'",'+
            '"password":"'+password+'"}';

        $.ajax({
            url: "php/usuarios.php",
            type: 'POST',
            data:"datos="+arrayJson,
            dataType: 'text',
            success: function(data) {
                var mensajeAlert=$(".mensaje");
                if(data=='Datos incorrectos, introduzca un usuario válido'){
                    mensajeAlert.removeClass('alert-success');
                    mensajeAlert.addClass('alert-danger');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display','block');
                }else {
                    sessionStorage.setItem('lgdusr', email);
                    mensajeAlert.addClass('alert-success');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display', 'block');
                    $('.ContentLogin').css('display','none');
                    $('.desenfoque').css('display','none');
                    addIconUsuarioMenu();
                    location.reload();
                }
            }
        });

    }

    if($('#chkRecordar').prop('checked')) {
        localStorage.setItem('lgdusr',email);
    }


}
function cerrarFormLogin(){
    $('.ContentLogin').css('display','none');
    $('.desenfoque').css('display','none');
}
/*Añadir opciones usuario ya logueado en elmenu*/
function addIconUsuarioMenu() {
    if(sessionStorage.getItem('lgdusr')!=null || localStorage.getItem('lgdusr')!=null){
        if(sessionStorage.getItem('lgdusr')==null)
            var emailUser='emailUser='+localStorage.getItem('lgdusr');
        else
            var emailUser='emailUser='+sessionStorage.getItem('lgdusr');
        $('.btn-identificate').addClass('dropdown menu-usuario');
        $('.btn-identificate').removeClass('btn-identificate');
        $('aaIdentificate').remove();

        $.get('php/devuelveCliente.php',emailUser,function(data){
            var jsonCliente = JSON.parse(data);
            var nombreCliente=jsonCliente.nombre;
            $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">'+nombreCliente+'</span><span class="caret"></span></a>' +
                '<ul class="dropdown-menu dropdown-cart" role="menu">' +
                '<li><a class="text-center" href="html/panelCliente.html">Mi cuenta</a></li>' +
                '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="#">Mis pedidos</a></li>' +
                '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
            $('.desconexion').on('click',desconectarse);

            $('.pedidosCliente').on('click',function(){
                accederPedidosCliente(jsonCliente);});
        });
    }
}

function desconectarse(){
    if(sessionStorage.getItem('lgdusr')!=null)
        sessionStorage.removeItem('lgdusr');

    if(localStorage.getItem('lgdusr')!=null)
        localStorage.removeItem('lgdusr');

    location.reload();
}
