var pal='padelegend$01';
var producto='';
var arrayFotos=[];
var curPic = -1;
var imgO = [];
var colorActual='';

$(document).ready(function() {
     var url= window.location.href;
    producto=url.split('?')[1].replace('#','');
    imgCont = $('#item-display');
    productTitleH2=$('.product-title h2');
    productPrice=$('.product-price');
    tituloProduct=$('.tituloProduct');
    $('.service1-item img').on('click',function(){
        img=$(this);
        cambiarFoto(img);
    });

    $(".nav-tabs li a").click(function(){
        $(this).tab("show");
    });
    $(".btn-3D").on("click",activar3D);
    switch (producto){
        case 'invictus':
            document.title='Invictus 2.0';
            imgCont.attr('src','img/imgProduct/invictus2.jpg');
            productTitleH2.text('INVICTUS 2.0');
            productPrice.html('<p>Precio: <del>239,00 €</del></p><br><p>Oferta: <div class="descuentoAnimado">191,20 €</div>  <span>20% DESCUENTO<span> </P>');
            tituloProduct.text('INVICTUS 2.0');
            cargarFotosDefecto();
            $('.descripcionProduct').html(' <h4 class="textoDescripcion">Descripción</h4><p>Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo, utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología revolucionaria como es el “<i>Diaxagonal solid Frame</i>”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, esto unido al núcleo de EVA de alta densidad especialmente desarrollado para conjugar lo más certeramente los materiales utilizados en toda la estructura del pala hacen que la pala no genere ningún tipo de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente sea la mejor pala del mercado.</p><p>Una de sus características más singulares es su sonido en el golpeo, su manejabilidad con un control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr.</p><h4 class="textoDescripcion">Características técnicas</h4> <dl class="textoDescripcion"><dt>Plano</dt><dd>Carbón Extreme  + fiberglass</dd><dt>Nucleo</dt><dd>HIPER SOFT EVA alta densidad Legend</dd><dt>Tubular</dt><dd>Diaxagonal Solid frame</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h4 class="textoDescripcion">Diseño</h4><p>Diseñada por uno de los estudios de diseño mas importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía cromática con  el carbono visto</p>');
            if($('.masProductosInvictus').length > 0 ){
                $('.masProductosInvictus').remove();
            }
            $('.btn-comprar').attr('data-id','invictus2');
            break;
        case 'redskin':
            document.title='Red Skin';
            imgCont.attr('src','img/imgProduct/redskin.jpg');
            productTitleH2.text('RED SKIN');
            productPrice.html('<p>Precio:<del> 219,00 €</del></p><br><p>Oferta: <div class="descuentoAnimado">175,20 € </div> <span>20% DESCUENTO<span> </P>');
            tituloProduct.text('RED SKIN');
            cargarFotosDefecto();
            $('.descripcionProduct').html('<h4 class="textoDescripcion descripcionCompleta">Descripción</h4><p class="textoDescripcion">Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100% de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar, los planos de la pala están compuesto de carbono 3k con un núcleo EVA media de alta densidad, esta combinación de materiales evita cualquier tipo  de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente se una de la mejores palas del mercado.</p> <p class="textoDescripcion">Este modelo nos brinda un juego de control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr. </p><H4 class="textoDescripcion caracteristicastecnicas">Características técnicas</H4><dl class="textoDescripcion"> <dt>Plano</dt> <dd>Carbón Extreme  + fiberglass</dd> <dt>Nucleo</dt> <dd>EVA HIPER Soft  Legend</dd> <dt>Tubular</dt> <dd>Kevlar frame  tech</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><H4 class="textoDescripcion diseño">Diseño</H4><p class="textoDescripcion">Diseñada por uno estudio de diseño más importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía con los colores y el carbono visto en la parte central del logo de nuestra marca.</p>');
            if($('.masProductosRedSkin').length > 0 ){
                $('.masProductosRedSkin').remove();
            }
            $('.btn-comprar').attr('data-id','redskin');
            break;
        case 'sniper':
            document.title='Sniper';
            imgCont.attr('src','img/imgProduct/sniper.jpg');
            productTitleH2.text('SNIPER');
            productPrice.html('<p>Precio:<del> 169,00 €</del></p><br><p>Oferta: <div class="descuentoAnimado">135,20 € </div>  <span>20% DESCUENTO<span> </P>');
            tituloProduct.text('SNIPER');
            cargarFotosDefecto();
            $('.descripcionProduct').html('  <H4 class="textoDescripcion">Descripción</H4><p>Pala en forma redonda con un grosor de 38 milímetros. Este pala cuanta con unas hendiduras que rodean a su corazón triangular, estas hendiduras no solo embellecen estéticamente a la pala sino que también son importantes a nivel estructural, la composición de la  pala es de fibra de vidrio con refuerzos de carbono en sus puntos más críticos, pala muy equilibrada para jugadores principiantes con un núcleo de FOAM. </p> <p> Su peso oscila de 355 gr a 365 gr. </p> <H4 class="textoDescripcion">Características técnicas</H4> <dl class="textoDescripcion"> <dt>Plano</dt> <dd>100% ECO-fiberglass</dd> <dt>Nucleo</dt> <dd>FOAM EXPLOSSION</dd> <dt>Tubular</dt> <dd>Tubular de fibra reforzado</dd> <dt>Taladros</dt> <dd>Control holes + ativibration system</dd> </dl> <H4 class="textoDescripcion">Diseño</H4><p>Diseñada por uno estudio de diseño más importantes en la industria del deporte, este modelo está concebido para principiantes, su color dorado unto con un diseño con líneas muy sencillas y elegantes hacen de ella una pala muy elegante en cualquier pista.</p>');
            if($('.masProductosSniper').length > 0 ){
                $('.masProductosSniper').remove();
            }
            if($('#item-5').length > 0 )
                $('#item-5').remove();

            $('.btn-comprar').attr('data-id','sniper');
            break;

        case 'target':
            colorActual='negra';
            cargarFotosDefecto();
            producto='TargetBlack';
            document.title='Target1';
            imgCont.attr('src','img/imgProduct/target1negra.jpg');
            productTitleH2.text('TARGET 1.0');
            productPrice.html('<p>Precio: 189,00 €</p><br><p>Oferta: <div class="descuentoAnimado">151,20 € </div>  <span>20% DESCUENTO<span> </P>');
            tituloProduct.text('TARGET 1.0');
            $('.product-color').append('<div class="row"><div class="col-lg-offset-1 col-md-offset-1 col-xs-offset-1 col-md-3 col-xs-3 col-lg-3 textColor"><span  class="middle">Color</span> </div><div class="col-md-4 col-xs-4 col-lg-4 divColor"><div class="caja" id="negro"><div class="negro colores"></div><span class="info">Negro</span></div><div class="caja" id="blanco"><div class="blanco colores" ></div><span class="info">Blanco</span></div></div></div>');
            $('.descripcionProduct').html(' <H4 class="textoDescripcion">Descripción</H4> <p>Pala en forma redonda con un grosor de 38 milímetros. Pala de fibra de vidrio que incorpora nuestra tecnología revolucionaria como es el “Diaxagonal solid Frame”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, su núcleo compuesto de FOAM de baja densidad de alta densidad unido a la mayor flexión de la fibra de vidrio  nos proporciona  un juego de ataque con una gran salida de bola sin perder el control de bola, muchos jugadores aseguran que las palas de fibra son las mejores dentro del mercado nosotros dejamos que eso lo decidáis vosotros una vez probéis esta hermosa y grandiosa pala. Este modelo lo podemos encontrar en dos combinaciones de colores, una en blanco perlado y otra con un negro brillo.</p><p>Su peso oscila de 355 gr a 365 gr.</p> <H4 class="textoDescripcion">Características técnicas</H4><dl class="textoDescripcion"> <dt>Plano</dt> <dd>100% fiberglass</dd><dt>Nucleo</dt><dd>FOAM EXPLOSSION</dd> <dt>Tubular</dt> <dd>Diaxagonal Solid frame</dd> <dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><H4 class="textoDescripcion">Diseño</H4><p>Diseñada por uno estudio de diseño más importantes en la industria del deporte, este modelo lo podemos encontrar en dos combinaciones de colores a cual más espectacular, una con una base en blanco perlado y otra con una base de negro metálico, ambas con un rosa fluor como como color referente.</p>');
            if($('.masProductosTargetBlack').length > 0 ){
                $('.masProductosTargetBlack').remove();
            }
            $('#blanco').on('click',function() {
                cambiarColor('blanco');
            });
            $('#negro').on('click',function(){
                cambiarColor('negro');
            });
            $('.btn-comprar').attr('data-id','target1');
            break;
    }
    $('.descuentoAnimado').hover(function(){
        $(this).addClass('animated pulse');
    }
    ,function () {
            $(this).removeClass('animated pulse');
        });

    addIconUsuarioMenu();
    cargarEventosBotonCarrito();
    actualizarCarrito();
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
    $('.btn-cerrar-login').on('click',cerrarFormLogin);


});
function activar3D(){
    cargarArrayFotos3D();
    for(i=0; i < arrayFotos.length; i++) {
        imgO[i] = new Image();
        imgO[i].src=arrayFotos[i];
    }
    swapImage();
}
function cargarArrayFotos3D(){
    arrayFotos = ["img/3D/"+producto+"/Render0000.jpg",
        "img/3D/"+producto+"/Render0001.jpg","img/3D/"+producto+"/Render0002.jpg","img/3D/"+producto+"/Render0003.jpg","img/3D/"+producto+"/Render0004.jpg","img/3D/"+producto+"/Render0005.jpg","img/3D/"+producto+"/Render0006.jpg","img/3D/"+producto+"/Render0007.jpg",
        "img/3D/"+producto+"/Render0008.jpg","img/3D/"+producto+"/Render0009.jpg","img/3D/"+producto+"/Render0010.jpg","img/3D/"+producto+"/Render0011.jpg","img/3D/"+producto+"/Render0012.jpg","img/3D/"+producto+"/Render0013.jpg","img/3D/"+producto+"/Render0014.jpg",
        "img/3D/"+producto+"/Render0015.jpg","img/3D/"+producto+"/Render0016.jpg","img/3D/"+producto+"/Render0017.jpg","img/3D/"+producto+"/Render0018.jpg","img/3D/"+producto+"/Render0019.jpg","img/3D/"+producto+"/Render0020.jpg","img/3D/"+producto+"/Render0021.jpg",
        "img/3D/"+producto+"/Render0022.jpg","img/3D/"+producto+"/Render0023.jpg","img/3D/"+producto+"/Render0024.jpg","img/3D/"+producto+"/Render0025.jpg","img/3D/"+producto+"/Render0026.jpg","img/3D/"+producto+"/Render0027.jpg","img/3D/"+producto+"/Render0028.jpg",
        "img/3D/"+producto+"/Render0029.jpg","img/3D/"+producto+"/Render0030.jpg","img/3D/"+producto+"/Render0031.jpg","img/3D/"+producto+"/Render0032.jpg","img/3D/"+producto+"/Render0033.jpg","img/3D/"+producto+"/Render0034.jpg","img/3D/"+producto+"/Render0035.jpg",
        "img/3D/"+producto+"/Render0036.jpg","img/3D/"+producto+"/Render0037.jpg","img/3D/"+producto+"/Render0038.jpg","img/3D/"+producto+"/Render0039.jpg","img/3D/"+producto+"/Render0040.jpg","img/3D/"+producto+"/Render0041.jpg","img/3D/"+producto+"/Render0042.jpg",
        "img/3D/"+producto+"/Render0043.jpg","img/3D/"+producto+"/Render0044.jpg"];
}
var intervalo="";
function swapImage() {
    clearTimeout(intervalo);
    curPic = (++curPic > arrayFotos.length-1)? 0 : curPic;
    var src=imgO[curPic].src;
    imgCont.attr('src',src);
     intervalo=setTimeout(swapImage,33);
}

function cambiarFoto(img){
    cargarFotosDefecto();
    var src=img.attr('src');
    clearTimeout(intervalo);
    var id=$(img).parent().attr('id');
    $('.fotoPrincipal').attr('src',src);
}
function cargarFotosDefecto(){
    switch (producto){
        case 'invictus':
            $('#item-1 img').attr('src','img/imgProduct/invictus_2.jpg');
            $('#item-2 img').attr('src','img/imgProduct/invictus3.jpg');
            $('#item-3 img').attr('src','img/imgProduct/invictus4.jpg');
            $('#item-4 img').attr('src','img/imgProduct/invictus5.jpg');
            $('#item-5 img').attr('src','img/imgProduct/invictus2.jpg');
            break;
        case 'redskin':
            $('#item-1 img').attr('src','img/imgProduct/redskin.jpg');
            $('#item-2 img').attr('src','img/imgProduct/redskin2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/redskin3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/redskin4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/redskin5.jpg');
            break;
        case 'sniper':
            $('#item-1 img').attr('src','img/imgProduct/sniper.jpg');
            $('#item-2 img').attr('src','img/imgProduct/sniper2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/sniper3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/sniper4.jpg');
            break;

        case 'target':
            $('#item-1 img').attr('src','img/imgProduct/target1negra.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetBlack5.jpg');
            break;
        case 'TargetBlack':
            $('#item-1 img').attr('src','img/imgProduct/target1negra.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetBlack5.jpg');
            break;
        case 'Targetwhite':
            $('#item-1 img').attr('src','img/imgProduct/target1blanca.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetwhite2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetwhite3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetwhite4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetwhite5.jpg');
            break;
    }
}
function cambiarColor(color) {
    clearTimeout(intervalo);
    if(color=='negro'){
        colorActual='negra';
        producto='TargetBlack';
        imgCont.attr('src','img/imgProduct/target1negra.jpg');
        $('#item-1 img').attr('src','img/imgProduct/target1negra.jpg');
        $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
        $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
        $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
        $('#item-5').css('display','block');
        if($('#item-5 img').length > 0 )
            $('#item-5 img').attr('src','img/imgProduct/targetblack5.jpg');
        else{
            $('#item-5').prepend(' <img src="img/imgProduct/targetblack5.jpg" alt="miniatura5"></img>');
        }

    }else{
        colorActual='blanca';
        producto='targetwhite';
        document.title='Target White';
        imgCont.attr('src','img/imgProduct/target1blanca.jpg');
        $('#item-1 img').attr('src','img/imgProduct/target1blanca.jpg');
        $('#item-2 img').attr('src','img/imgProduct/targetwhite2.jpg');
        $('#item-3 img').attr('src','img/imgProduct/targetwhite3.jpg');
        $('#item-4 img').attr('src','img/imgProduct/targetwhite4.jpg');
        $('#item-5 img').remove();
        $('#item-5').css('display','none');

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
        $.get('php/desencriptar.php?cadena='+localStorage.getItem('lgdusr'),function(data){
            inputEmail.val(data);
        });
    }

}
function validarLogin() {
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

        $.post("php/usuarios.php", "datos=" + arrayJson,
             function (data) {
                var mensajeAlert = $(".mensaje");
                if (data == 'Datos incorrectos, introduzca un usuario válido') {
                    mensajeAlert.removeClass('alert-success');
                    mensajeAlert.addClass('alert-danger');
                    mensajeAlert.text(data);
                    mensajeAlert.css('display', 'block');
                }
                 else {
                    var res=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                    sessionStorage.setItem('lgdusr', res);
                    mensajeAlert.addClass('alert-success');
                    mensajeAlert.text(res);
                    mensajeAlert.css('display', 'block');
                    $('.ContentLogin').css('display', 'none');
                    $('.desenfoque').css('display', 'none');
                    if ($('#chkRecordar').prop('checked')) {
                        localStorage.setItem('lgdusr', email);
                    }
                    addIconUsuarioMenu();
                    location.reload();
                }
            }
        );
    }
}
function cerrarFormLogin(){
    $('.ContentLogin').css('display','none');
    $('.desenfoque').css('display','none');
}
/*Añadir opciones usuario ya logueado en elmenu*/
function addIconUsuarioMenu() {
        if(sessionStorage.getItem('lgdusr')!=null) {
            var emailUser =sessionStorage.getItem('lgdusr');
            $.get('php/devuelveCliente.php?usuario='+encodeURIComponent(emailUser),function(data){
                var jsonCliente = data;
                var nombreCliente=jsonCliente.nombre;
                $('.menu-usuario').html('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' +
                    '<span class="glyphicon glyphicon-user"></span> <span class="nombre_usuario">'+nombreCliente+'</span><span class="caret"></span></a>' +
                    '<ul class="dropdown-menu dropdown-login" role="menu">' +
                    '<li><a class="text-center" href="html/panelCliente.html">Mi cuenta</a></li>' +
                    '<li class="divider"></li><li class="pedidosCliente"><a class="text-center" href="http://legendpadel.com/html/panelCliente.html?pedidos">Mis pedidos</a></li>' +
                    '<li class="divider"></li> <li class="desconexion"><a class="text-center" href="#">Desconexión</a></li></ul>');
                $('.desconexion').on('click',desconectarse);
            });
        }
        $('.btn-identificate').addClass('dropdown menu-usuario');
        $('.btn-identificate').removeClass('btn-identificate');
}

/* carrito */
function actualizarCarrito(){

    if(sessionStorage.getItem("lgdusr")==null){
        if(sessionStorage.getItem("nusrcrt")!=null){
            $.get('php/desencriptar.php','cadena='+sessionStorage.getItem('nusrcrt'),function(data){
                sCarrito=data;
                oCarrito=JSON.parse(sCarrito);
                var nElementos=0;
                for(i=0; i<oCarrito.length;i++){
                    nElementos+=parseInt(oCarrito[i][1]);
                }
                $(".carrito_n_productos").text(nElementos);
                $.get('php/montarNavCarrito.php?carrito='+encodeURIComponent(sessionStorage.getItem('nusrcrt')),function(sProductos){
                    $('.dropdown-cart').find('.divider').after(sProductos);
                    cargarEventosBotonEliminarProducto();
                    actualizarNumeroCarrito();
                });
            });
        }
    }
    else{
        sSesion=sessionStorage.getItem("lgdusr");
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
        $('.btn-comprar').on('click',function(){
            var boton=$(this);
            oProducto=$('<li class="item_carrito" data-id=""><span class="item"><span class="item-left"><img src="" alt="articulo_carrito"/><span class="item-info"><span class="item_cantidad">1x</span><span class="item_name"></span><span class="item_precio"></span></span></span><span class="item-right"><button class="btn btn-xs btn-danger pull-right">x</button></span></span></li>');
            var bEncontrado=false;
            var oItemCarrito;
            var oCarrito=$('.dropdown-cart');
            oCarrito.find('.item_carrito').each(function(){
                if($(this).find('img').attr('src')==$('.fotoPrincipal').attr('src')) {
                    bEncontrado = true;
                    oItemCarrito=$(this);
                }
            });
            if(bEncontrado){
                var oItemCantidad=oItemCarrito.find('.item_cantidad');
                oItemCantidad.text((parseInt(oItemCantidad.text().replace('x',''))+1)+"x");
                var oItemPrecio=oItemCarrito.find('.item_precio');
                var oPrecio=$('.descuentoAnimado').text();
                oItemPrecio.text((parseFloat(oItemPrecio.text().replace(',','.').replace(' €',''))+parseFloat(oPrecio.replace(',','.').replace(' €',''))).toFixed(2)+" €");
            }
            else{
                oProducto.find('.item_name').text($('.product-title h2').text());
                var oPrecio=$('.descuentoAnimado').text();
                var oItemPrecio=oProducto.find('.item_precio');
                oItemPrecio.text((parseFloat(oPrecio.replace(',','.').replace(' €',''))).toFixed(2)+" €");
                oProducto.find('.item_precio').text(oItemPrecio.text());
                oProducto.find('img').attr('src',$('.fotoPrincipal').attr('src'));

                var sID=boton.data('id');
                if(colorActual!=''){
                    sID+=colorActual;
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
        sessionStorage.removeItem("nusrcrt");
    }
    else {
        sCarrito = JSON.stringify(arrayProductos);
        var res=btoa(mcrypt.Encrypt(sCarrito,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
        if (sessionStorage.getItem("lgdusr") == null) {
            sessionStorage.setItem("nusrcrt", res);
        }
        else {
            sSesion = sessionStorage.getItem("lgdusr");
            $.get('php/guardarCarrito.php?usuario=' + encodeURIComponent(sSesion) + '&carrito=' + encodeURIComponent(sCarrito));
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