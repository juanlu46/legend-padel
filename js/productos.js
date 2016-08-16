
$(function() {
    var url=document.location.href;
    var cad=url.split('?');
    var producto=cad[1];
    
    switch (producto){

        case 'redSkin':
            document.title='Red Skin';
            $('li.disabled').text('Red Skin');
            $('.fotoPrincipal').attr('src','imgProduct/redskin1.jpg');
            $('.min1').attr('src','imgProduct/redskin1.jpg');
            $('.min2').attr('src','imgProduct/redskin2.jpg');
            $('.min3').attr('src','imgProduct/redskin3.jpg');
            $('.min4').attr('src','imgProduct/redskin4.jpg');
            $('.min5').attr('src','imgProduct/redskin5.jpg');
            $('h4.nombreProducto').text('Red Skin');
            $('.descripcionPrincipal').html('Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100 % de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar,los planos de la pala están compuesto de carbono 3k con... <a href="#panel1">Leer más</a>');
            $('h5.precio').text('219 EURO');
            $('.descripcion').html('<h5 class="textoDescripcion descripcionCompleta">Descripción</h5><p class="textoDescripcion">Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100% de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar, los planos de la pala están compuesto de carbono 3k con un núcleo EVA media de alta densidad, esta combinación de materiales evita cualquier tipo  de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente se una de la mejores palas del mercado.</p> <p class="textoDescripcion">Este modelo nos brinda un juego de control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr. </p><h5 class="textoDescripcion caracteristicastecnicas">Características técnicas</h5><dl class="textoDescripcion"> <dt>Plano</dt> <dd>Carbón Extreme  + fiberglass</dd> <dt>Nucleo</dt> <dd>EVA HIPER Soft  Legend</dd> <dt>Tubular</dt> <dd>Kevlar frame  tech</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h5 class="textoDescripcion diseño">Diseño</h5><p class="textoDescripcion">Diseñada por uno estudio de diseño más importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía con los colores y el carbono visto en la parte central del logo de nuestra marca.</p>');
            if($('.masProductosRedSkin').length > 0 ){
                $('.masProductosRedSkin').remove();
            }
            break;
        
        
    }


});