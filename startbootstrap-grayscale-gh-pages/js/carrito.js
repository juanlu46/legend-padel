var pal='padelegend$01';
$(document).ready(inicio);

function inicio(){
    addIconUsuarioMenu();
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
    $('.btn-actualizar').on('click',calcularTotalProductos);
    $('.btn-comprar').on('click',function(){
        if($('.producto').length>0){
            location.href='http://localhost/legend-padel/html/checkout.html';
        }
    });
    if(sessionStorage.getItem("lgdusr")==null){
        if(sessionStorage.getItem("nusrcrt")!=null){
                sCarrito=sessionStorage.getItem('nusrcrt');
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
            sSesion=sessionStorage.getItem('lgdusr');
            $.get('../php/montarCarritoUsuario.php?usuario='+encodeURIComponent(sSesion),function(sProductos){
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
    $(".envio_carrito, .total_carrito").text("0 €");
}

function aplicarManejadoresBoton(){
    $(".producto").each(function(){
        $(this).find("button").on('click',function(){
            $(this).parents('.producto').remove();
            calcularTotales();
            if($('.producto').length==0)
                noProductos();
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
        var res=btoa(mcrypt.Encrypt(sCarrito,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
            sessionStorage.setItem('nusrcrt', res);
    }
    else{
            sSesion=sessionStorage.getItem('lgdusr');
            $.get('../php/guardarCarrito.php?usuario='+encodeURIComponent(sSesion)+'&carrito='+encodeURIComponent(sCarrito));
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

function calcularTotalProductos(){
    $('.producto').each(function(){
        var cantidad=$(this).find('.cantidad_producto').val();
        var precioUnitario=parseFloat($(this).find('.precio').text().replace(' €',''));
        $(this).find('.total_producto').text((cantidad*precioUnitario).toFixed(2));
    });
    calcularTotales();
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

        var res=btoa(mcrypt.Encrypt(arrayJson,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));

        $.ajax({
            url: "../php/usuarios.php",
            type: 'POST',
            data:"datos="+res,
            dataType: 'text',
            success: function(data) {
                var mensajeAlert=$(".mensaje");
                if(data=='Datos incorrectos, introduzca un usuario válido'){
                    mensajeAlert.removeClass('alert-success');
                    mensajeAlert.addClass('alert-danger');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display','block');
                }else {
                    var res=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                    sessionStorage.setItem('lgdusr', res);
                    mensajeAlert.addClass('alert-success');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display', 'block');
                    $('.ContentLogin').css('display','none');
                    $('.desenfoque').css('display','none');
                    if($('#chkRecordar').prop('checked')) {
                        localStorage.setItem('lgdusr',res);
                    }
                    addIconUsuarioMenu();
                    location.href="http://localhost/legend-padel/index.html";
                }
            }
        });

    }
}
function cerrarFormLogin(){
    $('.ContentLogin').css('display','none');
    $('.desenfoque').css('display','none');
}
/*Añadir opciones usuario ya logueado en elmenu*/
function addIconUsuarioMenu() {
    if(sessionStorage.getItem('lgdusr')!=null || localStorage.getItem('lgdusr')!=null){
        if(sessionStorage.getItem('lgdusr')==null){
                var emailUser = localStorage.getItem('lgdusr');
                $.get('../php/devuelveCliente.php?usuario='+encodeURIComponent(emailUser),function(data){
                    var jsonCliente = data;
                    var nombreCliente=jsonCliente.nombre;
                    $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                        '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">'+nombreCliente+'</span><span class="caret"></span></a>' +
                        '<ul class="dropdown-menu dropdown-login" role="menu">' +
                        '<li><a class="text-center" href="html/panelCliente.html">Mi cuenta</a></li>' +
                        '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="html/panelCliente.html?pedidos">Mis pedidos</a></li>' +
                        '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
                    $('.desconexion').on('click',desconectarse);
                });

        }
        else {
            var emailUser = sessionStorage.getItem('lgdusr');
            $.get('../php/devuelveCliente.php?usuario=' + encodeURIComponent(emailUser), function (data) {
                var jsonCliente = data;
                var nombreCliente = jsonCliente.nombre;
                $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                    '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">' + nombreCliente + '</span><span class="caret"></span></a>' +
                    '<ul class="dropdown-menu dropdown-login" role="menu">' +
                    '<li><a class="text-center" href="html/panelCliente.html">Mi cuenta</a></li>' +
                    '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="html/panelCliente.html?pedidos">Mis pedidos</a></li>' +
                    '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
                $('.desconexion').on('click', desconectarse);

            });
        }
    }
}

function desconectarse(){
    if(sessionStorage.getItem('lgdusr')!=null)
        sessionStorage.removeItem('lgdusr');

    if(localStorage.getItem('lgdusr')!=null)
        localStorage.removeItem('lgdusr');

    location.reload();
}
