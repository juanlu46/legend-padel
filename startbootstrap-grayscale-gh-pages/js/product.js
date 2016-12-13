var producto='';
var arrayFotos=new Array();
var curPic = -1;
var imgO = new Array();

$(document).ready(function() {
    var url= window.location.href;
    producto=url.split('?')[1];
    imgCont = $('#item-display');
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
            $('#item-display').attr('src','img/imgProduct/invictus1.jpg');
            $('.product-title h2').text('INVICTUS 2.0');
            $('.product-price').html('<p>Precio: <del>239,00 €</del></p><br><p>Oferta: <div class="descuentoAnimado">191.20 €</div>  <span>20% DESCUENTO<span> </P>');
            $('.tituloProduct').text('INVICTUS 2.0');
            cargarFotosDefecto();
            $('.descripcionProduct').html(' <h4 class="textoDescripcion">Descripción</h4><p>Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo, utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología revolucionaria como es el “<i>Diaxagonal solid Frame</i>”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, esto unido al núcleo de EVA de alta densidad especialmente desarrollado para conjugar lo más certeramente los materiales utilizados en toda la estructura del pala hacen que la pala no genere ningún tipo de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente sea la mejor pala del mercado.</p><p>Una de sus características más singulares es su sonido en el golpeo, su manejabilidad con un control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr.</p><h4 class="textoDescripcion">Características técnicas</h4> <dl class="textoDescripcion"><dt>Plano</dt><dd>Carbón Extreme  + fiberglass</dd><dt>Nucleo</dt><dd>HIPER SOFT EVA alta densidad Legend</dd><dt>Tubular</dt><dd>Diaxagonal Solid frame</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h4 class="textoDescripcion">Diseño</h4><p>Diseñada por uno de los estudios de diseño mas importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía cromática con  el carbono visto</p>');
            if($('.masProductosInvictus').length > 0 ){
                $('.masProductosInvictus').remove();
            }
            break;
        case 'redskin':
            document.title='Red Skin';
            $('#item-display').attr('src','img/imgProduct/redskin1.jpg');
            $('.product-title h2').text('RED SKIN');
            $('.product-price').html('<p>Precio:<del> 219,00 €</del></p><br><p>Oferta: 175.20 €  <span>20% DESCUENTO<span> </P>');
            $('.tituloProduct').text('RED SKIN');
            cargarFotosDefecto();
            $('.descripcionProduct').html('<h4 class="textoDescripcion descripcionCompleta">Descripción</h4><p class="textoDescripcion">Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100% de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar, los planos de la pala están compuesto de carbono 3k con un núcleo EVA media de alta densidad, esta combinación de materiales evita cualquier tipo  de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente se una de la mejores palas del mercado.</p> <p class="textoDescripcion">Este modelo nos brinda un juego de control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr. </p><H4 class="textoDescripcion caracteristicastecnicas">Características técnicas</H4><dl class="textoDescripcion"> <dt>Plano</dt> <dd>Carbón Extreme  + fiberglass</dd> <dt>Nucleo</dt> <dd>EVA HIPER Soft  Legend</dd> <dt>Tubular</dt> <dd>Kevlar frame  tech</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><H4 class="textoDescripcion diseño">Diseño</H4><p class="textoDescripcion">Diseñada por uno estudio de diseño más importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía con los colores y el carbono visto en la parte central del logo de nuestra marca.</p>');
            if($('.masProductosRedSkin').length > 0 ){
                $('.masProductosRedSkin').remove();
            }
            break;
        case 'sniper':
            document.title='Sniper';
            $('#item-display').attr('src','img/imgProduct/sniper1.jpg');
            $('.product-title h2').text('SNIPER');
            $('.product-price').html('<p>Precio:<del> 169,00 €</del></p><br><p>Oferta: 135.20 €  <span>20% DESCUENTO<span> </P>');
            $('.tituloProduct').text('SNIPER');
            cargarFotosDefecto();
            $('.descripcionProduct').html('  <H4 class="textoDescripcion">Descripción</H4><p>Pala en forma redonda con un grosor de 38 milímetros. Este pala cuanta con unas hendiduras que rodean a su corazón triangular, estas hendiduras no solo embellecen estéticamente a la pala sino que también son importantes a nivel estructural, la composición de la  pala es de fibra de vidrio con refuerzos de carbono en sus puntos más críticos, pala muy equilibrada para jugadores principiantes con un núcleo de FOAM. </p> <p> Su peso oscila de 355 gr a 365 gr. </p> <H4 class="textoDescripcion">Características técnicas</H4> <dl class="textoDescripcion"> <dt>Plano</dt> <dd>100% ECO-fiberglass</dd> <dt>Nucleo</dt> <dd>FOAM EXPLOSSION</dd> <dt>Tubular</dt> <dd>Tubular de fibra reforzado</dd> <dt>Taladros</dt> <dd>Control holes + ativibration system</dd> </dl> <H4 class="textoDescripcion">Diseño</H4><p>Diseñada por uno estudio de diseño más importantes en la industria del deporte, este modelo está concebido para principiantes, su color dorado unto con un diseño con líneas muy sencillas y elegantes hacen de ella una pala muy elegante en cualquier pista.</p>');
            if($('.masProductosSniper').length > 0 ){
                $('.masProductosSniper').remove();
            }
            if($('#item-5').length > 0 )
                $('#item-5').remove();
            break;

        case 'target':
            cargarFotosDefecto();
            producto='TargetBlack';
            document.title='Target 1.0';
            $('#item-display').attr('src','img/imgProduct/targetBlack1.jpg');
            $('.product-title h2').text('TARGET 1.0');
            $('.product-price').html('<p>Precio: 189,00 €</p><br><p>Oferta: 151.20 €  <span>20% DESCUENTO<span> </P>');
            $('.tituloProduct').text('TARGET 1.0');
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
            break;
    }
    $('.descuentoAnimado').hover(function(){
        $(this).addClass('animated pulse');
    }
    ,function () {
            $(this).removeClass('animated pulse');
        });



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
    $('#item-display').attr('src',src);
     intervalo=setTimeout(swapImage,33);
}

function cambiarFoto(img){
    cargarFotosDefecto();
    var src=img.attr('src');
    clearTimeout(intervalo);
    var id=$(img).parent().attr('id');
     $('#'+id+' img').attr('src','img/3D/'+producto+'/Render0000.jpg');
     $('#'+id+' img').attr('class','img3d');
    $('.img3d').on('click',swapImage);
    $('.fotoPrincipal').attr('src',src);
}
function cargarFotosDefecto(){
    switch (producto){
        case 'invictus':
            $('#item-1 img').attr('src','img/imgProduct/invictus2.jpg');
            $('#item-2 img').attr('src','img/imgProduct/invictus3.jpg');
            $('#item-3 img').attr('src','img/imgProduct/invictus4.jpg');
            $('#item-4 img').attr('src','img/imgProduct/invictus5.jpg');
            $('#item-5 img').attr('src','img/imgProduct/invictus1.jpg');
            break;
        case 'redskin':
            $('#item-1 img').attr('src','img/imgProduct/redskin1.jpg');
            $('#item-2 img').attr('src','img/imgProduct/redskin2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/redskin3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/redskin4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/redskin5.jpg');
            break;
        case 'sniper':
            $('#item-1 img').attr('src','img/imgProduct/sniper1.jpg');
            $('#item-2 img').attr('src','img/imgProduct/sniper2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/sniper3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/sniper4.jpg');
            break;

        case 'target':
            $('#item-1 img').attr('src','img/imgProduct/targetBlack1.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetBlack5.jpg');
            break;
        case 'TargetBlack':
            $('#item-1 img').attr('src','img/imgProduct/targetBlack1.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetBlack5.jpg');
            break;
        case 'Targetwhite':
            $('#item-1 img').attr('src','img/imgProduct/targetwhite1.jpg');
            $('#item-2 img').attr('src','img/imgProduct/targetwhite2.jpg');
            $('#item-3 img').attr('src','img/imgProduct/targetwhite3.jpg');
            $('#item-4 img').attr('src','img/imgProduct/targetwhite4.jpg');
            $('#item-5 img').attr('src','img/imgProduct/targetwhite5.jpg');
            break;
    }
}
function cambiarColor(color) {
    if(color=='negro'){
        producto='TargetBlack';
        cargarArrayFotos3D();
        $('#item-1 img').attr('src','img/imgProduct/targetBlack1.jpg');
        $('#item-2 img').attr('src','img/imgProduct/targetBlack2.jpg');
        $('#item-3 img').attr('src','img/imgProduct/targetBlack3.jpg');
        $('#item-4 img').attr('src','img/imgProduct/targetBlack4.jpg');
        if($('#item-5 img').length > 0 )
            $('#item-5 img').attr('src','imgProduct/targetBlack5.jpg');
        else{
            $('#item-5').prepend(' <img src="img/imgProduct/targetblack5.jpg" alt="miniatura5"></img>');
        }

    }else{
        producto='targetwhite';
        document.title='Target White';
        cargarArrayFotos3D();
        swapImage();
        $('#item-1 img').attr('src','img/imgProduct/targetwhite1.jpg');
        $('#item-2 img').attr('src','img/imgProduct/targetwhite2.jpg');
        $('#item-3 img').attr('src','img/imgProduct/targetwhite3.jpg');
        $('#item-4 img').attr('src','img/imgProduct/targetwhite4.jpg');
        $('#item-5 img').remove();

    }
}


