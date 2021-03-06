$(document).ready(inicio);


var vistoEnvio=false;
var pal='padelegend$01';
function inicio(){
    addIconUsuarioMenu();
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",function(event){validarLogin(event);});
    if(sessionStorage.getItem('lgdusr')!=null) {
        $.get('../php/montarResumenPedido.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')) , function (sProductos) {
            $('.m-progress').css('display', 'none');
            if(sProductos==""){
                $('.aviso').html('NO HAY PRODUCTOS QUE PROCESAR').css('display','block');
                $('.cart-head').css('display','none');
            }
            else {
                manejadoresCartHead();
                $('.productos').append(sProductos);
                var oPanelPedido=$('.panel-pedido');
                oPanelPedido.css('display', 'block');
                oPanelPedido.find('.btn-continuar').on('click',function(){
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
        $.get('../php/desencriptar.php','cadena='+localStorage.getItem('lgdusr'),function(data){
            inputEmail.val(data);
            
        });
       
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
            url: "../php/usuarios.php",
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
                    var resEmail=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                    sessionStorage.setItem('lgdusr', resEmail);
                    mensajeAlert.addClass('alert-success');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display', 'block');
                    $('.ContentLogin').css('display','none');
                    $('.desenfoque').css('display','none');
                    if($('#chkRecordar').prop('checked')) {
                        localStorage.setItem('lgdusr',email);
                    }
                    addIconUsuarioMenu();
                    location.reload();
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
        if(sessionStorage.getItem('lgdusr')!=null) {
            var emailUser = sessionStorage.getItem('lgdusr');

            $('.btn-identificate').addClass('dropdown menu-usuario');
            $('.btn-identificate').removeClass('btn-identificate');

            $.get('../php/devuelveCliente.php?usuario=' + encodeURIComponent(emailUser), function (data) {
                var jsonCliente = data;
                var nombreCliente = jsonCliente.nombre;
                $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                    '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">' + nombreCliente + '</span><span class="caret"></span></a>' +
                    '<ul class="dropdown-menu dropdown-login" role="menu">' +
                    '<li><a class="text-center" href="panelCliente.html">Mi cuenta</a></li>' +
                    '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="http://www.legendpadel.com/html/panelCliente.html?pedidos">Mis pedidos</a></li>' +
                    '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
                $('.desconexion').on('click', desconectarse);
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
        vistoEnvio=false;
        event.preventDefault();
        cargarPanelEnvio();
        $('.step_complete').removeClass('step_complete');
        $('.step_pedido , .step_pedido .step_flecha, .step_envio, .step_envio .step_flecha').addClass('step_complete');
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
        oBoton.addClass("btn-m-progress");
        $.get('../php/getDireccion.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')),function(oDireccion){
            oBoton.removeClass("btn-m-progress");
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
        iTiempo+=3;
        sErrores+="- La dirección debe ser válida y no vacía<br>";
    }
    if(!expNombre.test(oLocalidad.val())){
        bCorrecto=false;
        iTiempo+=3;
        sErrores+="- La localidad debe ser válida y no vacía<br>";
    }

    if(!expNombre.test(oProvincia.val())){
        bCorrecto=false;
        iTiempo+=3;
        sErrores+="- La provincia debe ser válida y no vacía<br>";
    }

    if(!expCP.test(oCP.val())){
        bCorrecto=false;
        iTiempo+=3;
        sErrores+="- El código postal debe ser válido y no vacío<br>";
    }

    if(!expTelefono.test(oTelefono.val())){
        bCorrecto=false;
        iTiempo+=3;
        sErrores+="- El código postal debe ser válido y no vacío<br>";
    }

    if(bCorrecto){
        validarPago();
    }
    else{
        var oAlert=$(".mensajesUsuarios");
        oAlert.addClass("notice-success").html('<span class="glyphicon glyphicon-alert"></span> Algo va mal:<br>'+sErrores);
        oAlert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
        setTimeout(function() {
            oAlert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
        },iTiempo*1000);
    }
} 

/*function cargarPanelPago(){
    vistoEnvio=true;
    $('.panel-envio').css('display','none');
    $('.step_pago, .step_pago .step_flecha').addClass('step_complete');
    var oPanelPago=$('.panel-pago');
    oPanelPago.css('display','block');
    var annoActual=(new Date).getFullYear();
    var selectAnnoCaducidad=oPanelPago.find('select[name="a-caducidad"]');
    for(i=0;i<10;i++){
        selectAnnoCaducidad.append('<option value="'+(annoActual+i)+'">'+(annoActual+i)+'</option>');
    }
}
*/
function validarPago(){
    var fTotal;
    var nID;
    var oPanelEnvio=$('.panel-envio');
    var sDireccion=oPanelEnvio.find('input[name="direccion"]').val();
    var sLocalidad=oPanelEnvio.find('input[name="localidad"]').val();
    var sProvincia=oPanelEnvio.find('input[name="provincia"]').val();
    var sCP=oPanelEnvio.find('input[name="cp"]').val();
    var sTelefono=oPanelEnvio.find('input[name="telefono"]').val();
    $.ajax('../php/obtenerTotal.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr'))+'&direccion='+encodeURIComponent(sDireccion)+'&localidad='+encodeURIComponent(sLocalidad)+
        '&provincia='+encodeURIComponent(sProvincia)+'&cp='+encodeURIComponent(sCP)+'&telefono='+encodeURIComponent(sTelefono),{
        async:false,
        cache:false,
        dataType:'json',
        method:'GET',
        success:function(data){
            fTotal=parseFloat(data.total);
            nID=data.id.toString();
        }
    });
    var sVariables='{"cantidad":"'+fTotal+'","id":"'+nID+'","descripcion":"Palas LEGEND PADEL"}';
    sVariables=btoa(mcrypt.Encrypt(sVariables,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
    $.ajax('../php/obtenerVariablePago.php?data='+encodeURIComponent(sVariables),{
        async:false,
        cache:false,
        dataType:'json',
        method:'GET',
        success:function(data){
            var oPanel=$('.panel-pago');
            oPanel.find('input[name="Ds_MerchantParameters"]').val(data.parametros);
            oPanel.find('input[name="Ds_Signature"]').val(data.signature);
            $('#form_pago').submit();
        },
        error:function(){
            var oAlert=$(".mensajesUsuarios");
            oAlert.addClass("notice-success").html('<span class="glyphicon glyphicon-alert"></span> Lo sentimos :( <br>Ha ocurrido un error con el servidor, intentelo de nuevo más tarde.');
            oAlert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
            setTimeout(function() {
                oAlert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
            },8000);
        }
    });
}