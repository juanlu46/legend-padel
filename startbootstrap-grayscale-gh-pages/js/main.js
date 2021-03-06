var pal='padelegend$01';
// Ajustar Navbar
function ajustarNavBar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(document).on('click', '.btn-select', function (e) {
    e.preventDefault();
    var ul = $(this).find("ul");
    if ($(this).hasClass("active")) {
        if (ul.find("li").is(e.target)) {
            var target = $(e.target);
            target.addClass("selected").siblings().removeClass("selected");
            var value = target.html();
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
            var dataID=$(this).find(".btn-select-value").data("id");
            if(value=="BLANCA") {
                $('.item img[data-id="' + dataID + '"]').attr('src', 'img/imgProduct/target1blanca.jpg');
            }
            else {
                $('.item img[data-id="' + dataID + '"]').attr('src', 'img/imgProduct/target1negra.jpg');
            }
        }
        ul.hide();
        $(this).removeClass("active");
    }
    else {
        $('.btn-select').not(this).each(function () {
            $(this).removeClass("active").find("ul").hide();
        });
        ul.slideDown(300);
        $(this).addClass("active");
    }
});

$(document).on('click', function (e) {
    var target = $(e.target).closest(".btn-select");
    if (!target.length) {
        $(".btn-select").removeClass("active").find("ul").hide();
    }
});

$(window).scroll(ajustarNavBar);
$(document).ready(function(){
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    $('.btnContactar').on('click',validarFormContacto);
    addIconUsuarioMenu();
    actualizarCarrito();
    ajustarNavBar();
    $(".marca-titulo").addClass("animated zoomInDown");
    $(".es1").addClass("animated fadeInLeftBig");
    $(".es2").css('visibility','visible').addClass("animated fadeInRightBig");
    //TIENDA
    $(".btn-select").each(function (e) {
        var value = $(this).find("ul li.selected").html();
        if (value != undefined) {
            $(this).find(".btn-select-input").val(value);
            $(this).find(".btn-select-value").html(value);
        }
    });
    cargarEventosBotonCarrito();

    cargarEventoBotonRedes();

    var url=window.location.href;
    var a=url.split('?');
    if(a[1]=='login') {
        cargarFormIdent(a);
    }
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",function() {
        validarLogin(a);
    });
    $('.btn-cerrar-login').on('click',cerrarFormLogin);
    /*********/

});

function cargarEventoBotonRedes(){
    $('.btn-load-redes').on('click',function(){
        $(this).addClass("m-progress");
        $('.preload').load('html/redes_sociales.html',function(){
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.7";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            setTimeout(function(){
                $('.redes-sociales').html($('.preload').html());
                $.getScript('//platform.twitter.com/widgets.js');
                $(".service,.service-tw").hover(function(){
                    $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-bottom': '240px', 'padding-left': '0'},300);
                },function(){
                    $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-bottom': '0', 'padding-left': '0'},300);
                });
                $(".service-ig").hover(function(){
                    $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-bottom': '330px', 'padding-left': '0'},300);
                },function(){
                    $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-bottom': '0', 'padding-left': '0'},300);
                });
            },3000);
        });
    });

}

//Cierra los menús al hacer click
$('.navbar-collapse ul li a').click(function() {
    $(this).closest('.collapse').collapse('toggle');
});
/* JS DE LOGIN */
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
        $.get('php/desencriptar.php?cadena'+encodeURIComponent(sessionStorage.getItem('lgdusr')),function(data){
            inputEmail.val(data);
        });
    }
    if(localStorage.getItem('lgdusr')!=null ){
        $.get('php/desencriptar.php?cadena='+encodeURIComponent(localStorage.getItem('lgdusr')),function(data){
            inputEmail.val(data);
        });
 
    }

}

function validarLogin(a) {
    var expEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$");
    var email = $("#inputEmail").val();
    var mendaje = $(".mensaje");

    //Verifica la existencia de una letra minuscula(?=.*[a-z])  y (?=.*[A-Z]) la de una letra en mayusculas.
// Por ultimo la longitud la verificamos con los valores entre llaves {6,15}.
    var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");
    var password = $("#inputPassword").val();
    
    if (!expEmail.test(email) && !expPass.test(password)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Email y Contraseña Incorrectos');
        mendaje.css('display', 'block');
    }
    else if (!expPass.test(password)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Contraseña Incorrecta');
        mendaje.css('display', 'block');
    }
    else if (!expEmail.test(email)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Email Incorrecto');
        mendaje.css('display', 'block');
    }
    else {
        var arrayJson = '{"email":"' + email + '",' +
            '"password":"' + password + '"}';
        
        var res=btoa(mcrypt.Encrypt(arrayJson,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
        $.get("php/usuarios.php?datos="+encodeURIComponent(res),function (data) {
                var mensajeAlert = $(".mensaje");
                if (data == 'Datos incorrectos, introduzca un usuario válido') {
                    mensajeAlert.removeClass('alert-success');
                    mensajeAlert.addClass('alert-danger');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display', 'block');
                } else {
                    var resEmail=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                        sessionStorage.setItem('lgdusr', resEmail);
                    if ($('#chkRecordar').prop('checked')) {
                        localStorage.setItem('lgdusr', resEmail);
                    }
                        $('.ContentLogin').css('display', 'none');
                        $('.desenfoque').css('display', 'none');

                        addIconUsuarioMenu();
                        if(a.legnth==1){
                            location.reload();
                        }
                        else{
                            document.location.href='http://www.legendpadel.com/index.html';
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

    if(sessionStorage.getItem('lgdusr')!=null){
                var emailUser =sessionStorage.getItem('lgdusr');
                $.get('php/devuelveCliente.php?usuario='+encodeURIComponent(emailUser),function(data){
                    var jsonCliente = data;
                    var nombreCliente=jsonCliente.nombre;
                    $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                        '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">'+nombreCliente+'</span><span class="caret"></span></a>' +
                        '<ul class="dropdown-menu dropdown-login" role="menu">' +
                        '<li><a class="text-center" href="html/panelCliente.html">Mi cuenta</a></li>' +
                        '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="http://www.legendpadel.com/html/panelCliente.html?pedidos">Mis pedidos</a></li>' +
                        '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
                    $('.desconexion').on('click',desconectarse);
                });
        
    $('.btn-identificate').addClass('dropdown menu-usuario');
    $('.btn-identificate').removeClass('btn-identificate');
    }
}
function desconectarse(){
   if(sessionStorage.getItem('lgdusr')!=null)
       sessionStorage.removeItem('lgdusr');

   if(localStorage.getItem('lgdusr')!=null)
       localStorage.removeItem('lgdusr');
    
   location.reload();
}

/* carrito */
function actualizarCarrito(){
    if(sessionStorage.getItem("lgdusr")==null){
        if(localStorage.getItem("nusrcrt")!=null){
            $.get('php/desencriptar.php','cadena='+encodeURIComponent(localStorage.getItem('nusrcrt')),function(data){
                sCarrito=data;
                oCarrito=JSON.parse(sCarrito);
                var nElementos=0;
                for(i=0; i<oCarrito.length;i++){
                    nElementos+=parseInt(oCarrito[i][1]);
                }
                $(".carrito_n_productos").text(nElementos);
                $.get('php/montarNavCarrito.php?carrito='+encodeURIComponent(localStorage.getItem('nusrcrt')),function(sProductos){
                    $('.dropdown-cart').find('.divider').after(sProductos);
                    $('.item_carrito').each(function(){
                        var preciosinE=$(this).find('.item_precio').text();
                        $(this).find('.item_precio').text(preciosinE +' €');
                    });

                    cargarEventosBotonEliminarProducto();
                    actualizarNumeroCarrito();
                });
            });
        }
    }
    else{
            sSesion=sessionStorage.getItem('lgdusr');
            $.get('php/montarNavCarritoUsuario.php?usuario='+encodeURIComponent(sSesion),function(sProductos){
                $('.dropdown-cart').find('.divider').after(sProductos);
                var precio=$('.item_precio').text();
                precio=precio+' €';
                $('.item_precio').text(precio);
                cargarEventosBotonEliminarProducto();
                actualizarNumeroCarrito();
            });
    }
}

function cargarEventosBotonEliminarProducto(){
    $('.item_carrito').each(function(){
        $(this).find('button').on('click',function(){
            $(this).parents('.item_carrito').remove();
            guardarCarrito();
            actualizarNumeroCarrito();
        });
    });
}

function cargarEventosBotonCarrito(){
    var oProducto;
    $(".item").each(function(){
        var item =$(this);
        oBoton=item.find('.item-pie button');
        oBoton.on('click',function(){
            var boton=$(this);
            oProducto=$('<li class="item_carrito" data-id=""><span class="item"><span class="item-left"><img src="" alt="articulo_carrito"/><span class="item-info"><span class="item_cantidad">1x</span><span class="item_name"></span><span class="item_precio"></span></span></span><span class="item-right"><button class="btn btn-xs btn-danger pull-right">x</button></span></span></li>');
            var bEncontrado=false;
            var oItemCarrito;
            var oCarrito=$('.dropdown-cart');
            oCarrito.find('.item_carrito').each(function(){
                if($(this).find('img').attr('src')==item.find('.hovereffect img').first().attr('src')) {
                    bEncontrado = true;
                    oItemCarrito=$(this);
                }
            });
            if(bEncontrado){
                var oItemCantidad=oItemCarrito.find('.item_cantidad');
                oItemCantidad.text((parseInt(oItemCantidad.text().replace('x',''))+1)+"x");
                var oItemPrecio=oItemCarrito.find('.item_precio');
                oItemPrecio.text((parseFloat(oItemPrecio.text().replace(',','.').replace(' €',''))+parseFloat(item.find('.precio').text().replace(',','.').replace(' €',''))).toFixed(2)+" €");
            }
            else{
                oProducto.find('.item_name').text(item.find('.item-pie a').first().text());
                oProducto.find('.item_precio').text(item.find('.precio').text().replace(',','.'));
                oProducto.find('img').attr('src',item.find('.hovereffect img').first().attr('src'));
                var oColor=item.find('.btn-select .selected');
                var sID=boton.data('id');
                if(oColor.length>0){
                    sID+=oColor.text().toLowerCase();
                }
                oProducto.data('id',sID);
                oProducto.find(".item-right button").on('click',function(){
                    $(this).parents('.item_carrito').remove();
                    guardarCarrito();
                    actualizarNumeroCarrito();
                });
                oCarrito.append(oProducto);
            }
            var oAlert=$(".mensajesUsuarios");
            oAlert.addClass("notice-success").html('<span class="glyphicon glyphicon-shopping-cart"></span> Artículo añadido');
            oAlert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
            setTimeout(function() {
                oAlert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
            },3000);

            actualizarNumeroCarrito();
            guardarCarrito();
        });
    });
}

function actualizarNumeroCarrito(){
    var nCantidad=0;
    $(".item_carrito").each(function(){
        nCantidad+=parseInt($(this).find('.item_cantidad').text().replace('x',''));
    });
    $(".carrito_n_productos").text(nCantidad);
}

function guardarCarrito(){
    arrayProductos=[];
    $(".item_carrito").each(function(){
        id=$(this).data('id');
        cantidad=$(this).find('.item_cantidad').text().replace('x','');
        arrayProductos.push([id,cantidad]);
    });
    if(arrayProductos.length==0){
        localStorage.removeItem("nusrcrt");
    }
    else {
        sCarrito = JSON.stringify(arrayProductos);
        if (sessionStorage.getItem("lgdusr") == null) {
            var res=btoa(mcrypt.Encrypt(sCarrito,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
            localStorage.setItem('nusrcrt', res);
        }
        else {
                sSesion = sessionStorage.getItem('lgdusr');
                $.get('php/guardarCarrito.php?usuario=' + encodeURIComponent(sSesion) + '&carrito=' + encodeURIComponent(sCarrito));
        }
    }
}
function validarFormContacto(){
    var nombre=$('#contact-nombre').val();
    var apellidos=$('#contact-apellidos').val();
    var email=$('#contact-email').val();
    var asunto=$('#contact-asunto').val();
    var mensaje=$('#contact-mensaje').val();
    var alert=$('.mensajesUsuarios');
    var error=false;

    var expNombre=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$");
    var expApellidos=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$");
    var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
    var textError="";

    if(!expNombre.test(nombre)) {
        textError='Nombre Incorrecto<br/>';
        error=true;
    }
    if(!expApellidos.test(apellidos)) {
        textError+='Apellidos Incorrecto<br/>';
        error=true;
    }
    if(!expEmail.test(email)) {
        textError+='Email Incorrecto<br/>';
        error=true;
    }
    if(asunto==""){
        textError+='El asunto no puede estar vacío<br/>';
        error=true;
    }
    if(mensaje==""){
        textError+='El mensaje no puede estar vacío<br/>';
        error=true;
    }
    if(error==false){
        var sJson='{'+
            '"remitente":"'+email+'",'+
            '"nombre":"'+nombre+'",'+
            '"apellidos":"'+apellidos+'",'+
            '"asunto":"'+asunto+'",'+
            '"mensaje":"'+mensaje+'"'+
            '}';
        $.ajax({
            url: "php/contacto.php",
            type: 'POST',
            data:"datos="+sJson,
            dataType: 'text',
            success: function(data) {
                if(data=='Se produjo un error al enviar su mensaje'){
                    alert.addClass('notice-danger');
                }
                else{
                    alert.addClass('notice-success');
                }

                alert.html(data);
                alert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
                setTimeout(function() {
                    alert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
                },3000);
            }
        });
    }
    else{
        alert.addClass('notice-danger');
        alert.html(textError);
        alert.css({"display":"block","position":"fixed","top":"3em","left":"1em","font-size":"1.4em","margin":"auto","color":"black"});
        setTimeout(function() {
            alert.css({"display":"none","position":"","top":"","left":"","font-size":"","margin":""});
        },3000);
    }


}
function abrirCaptcha(){

    $('.g-recaptcha').css('display','block');

}
function recaptcha_callback(response){

        if (g-recaptcha-response == true) {

            document.getElementById('boton_oculto').style.display = 'block';

        }else{

            alert("compruebe que no es un robot");

        }
}
