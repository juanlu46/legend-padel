$(document).ready(inicio);
var pal='padelegend$01';
function inicio(){
    addIconUsuarioMenu();
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
    var url= window.location.href;
    var parametros=url.split('?')[1].split('&');
    if(parametros[0].split('=')[1]=="true"){
        $('.titulo-mensaje').html('<span class="glyphicon glyphicon-ok"></span> PAGO REALIZADO CON ÉXITO');
        $('.mensaje').html('Tu número de pedido: '+parametros[1].split('=')[1]+'<br>Ya puedes cerrar la ventana o seguir navegando con la barra superior.<br>Gracias y esperamos que no sea la última ;)');
    }
    else{
        $('.titulo-mensaje').html('<span class="glyphicon glyphicon-remove"></span> HA OCURRIDO UN ERROR EN EL PAGO');
        $('.mensaje').html('Lo sentimos, pero no ha sido posible realizar el pago. Intentelo de nuevo más tarde o compruebe que su tarjeta no está caducada o que su banco no está autorizadno el pago.<br>'+
        'Disculpe las molestias :(');
    }
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
        $.get('../php/desencriptar.php?cadena='+sessionStorage.getItem('lgdusr'),function(data){
            inputEmail.val(data);
        });
    }
    if(localStorage.getItem('lgdusr')!=null ){
        $.get('../php/desencriptar.php?cadena='+localStorage.getItem('lgdusr'),function(data){
            inputEmail.val(data);
        });

    }

}

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