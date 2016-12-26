$(document).ready(inicio);


var vistoEnvio=false;

function inicio(){
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
    if(sessionStorage.getItem('lgdusr')!=null) {
        $.get('../php/montarResumenPedido.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')) , function (sProductos) {
            $('.m-progress').css('display', 'none');
            if(sProductos==null){
                $('.aviso').html('NO HAY PRODUCTOS QUE PROCESAR').css('display','block');
                $('.cart-head').css('display','none');
            }
            else {
                manejadoresCartHead();
                $('.productos').append(sProductos);
                var oPanelPedido=$('.panel-pedido');
                oPanelPedido.css('display', 'block');
                oPanelPedido.find('.btn-continar').on('click',function(){
                    cargarPanelEnvio();
                });

            }
        });
    }
    else{
        $('.m-progress').css('display', 'none');
        $('.aviso').html('INICIE SESIÓN Y HAGA SU PEDIDO').css('display','block');
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

function manejadoresCartHead(){
    $('.step_pedido').find('a').on('click',function(event){
        event.preventDefault();
        $('.panel-info').css('display','none');
        $('.step_complete').removeClass('step_complete');
        $('.step_pedido, .step_pedido .step_flecha').addClass('step_complete');
        $('.panel-pedido').css('display','block');
        vistoEnvio=false;
    });
    $('.step_envio').find('a').on('click',function(event){
        event.preventDefault();
        $('.panel-info').css('display','none');
        $('.step_complete').removeClass('step_complete');
        $('.step_pedido , .step_pedido .step_flecha, .step_envio, .step_envio .step_flecha').addClass('step_complete');
        $('.panel-envio').css('display','block');
    });
    $('.step_pago').on('click',function(event){
        event.preventDefault();
    });
    $('.cart-head').css('display','block');
}

function cargarPanelEnvio(){
    $('.panel-info').css('display','none');
    var oPanelEnvio=$('.panel-envio');
    oPanelEnvio.css('display','block');
    $('.step_envio, .step_envio .step_flecha').addClass('step_complete');
    $('.btn_mi_direccion').on('click',function(){
        var oBoton=$(this);
        oBoton.addClass("m-progress");
        $.get('../php/getDireccion.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')),function(oDireccion){
            oBoton.removeClass("m-progress");
            oBoton.css('display','none');
            $('input[name="direccion"]').val(oDireccion['direccion']);
            $('input[name="localidad"]').val(oDireccion['localidad']);
            $('input[name="provincia"]').val(oDireccion['provincia']);
            $('input[name="cp"]').val(oDireccion['cp']);
            $('input[name="telefono"]').val(oDireccion['telefono']);
        });
    });
    oPanelEnvio.find('.btn-continuar').on('click',function(){
        validarFormDireccion();
    });
}

function validarFormDireccion(){
    var sErrores="";
    var iTiempo=2;
    var bCorrecto=true;
    var oDireccion=$('input[name="direccion"]');
    var oLocalidad=$('input[name="localidad"]');
    var oProvincia=$('input[name="provincia"]');
    var oCP=$('input[name="cp"]');
    var oTelefono=$('input[name="telefono"]');
    var expDireccion=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\ \/\º\ª\,]{4,255}$");
    var expNombre=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{3,50}$");
    var expTelefono=new RegExp("^[9|6|7][0-9]{8}$");
    var expCP=new RegExp("^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$");
    var expEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$");
    if(!expDireccion.test(oDireccion.val())){
        bCorrecto=false;
        iTiemp+=3;
        sErrores+="La dirección debe ser válida y no vacía<br>";
    }else if(!expNombre.test(oLocalidad.val())){
        bCorrecto=false;
        iTiemp+=3;
        sErrores+="La localidad debe ser válida y no vacía<br>";
    }
    else if(!expNombre.test(oProvincia.val())){
        bCorrecto=false;
        iTiemp+=3;
        sErrores+="La provincia debe ser válida y no vacía<br>";
    }
    else if(!expCP.test(oCP.val())){
        bCorrecto=false;
        iTiemp+=3;
        sErrores+="El código postal debe ser válido y no vacío<br>";
    }
    else if(!expTelefono.test(oTelefono.val())){
        bCorrecto=false;
        iTiemp+=3;
        sErrores+="El código postal debe ser válido y no vacío<br>";
    }

    if(bCorrecto){

    }
    else{
        var oAlert=$(".mensajesUsuarios");
        oAlert.addClass("notice-success").html('<span class="glyphicon glyphicon-shopping-cart"></span> Artículo añadido');
        oAlert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
        setTimeout(function() {
            oAlert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
        },3000);
    }
}