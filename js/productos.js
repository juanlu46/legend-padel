
$(function() {
    var url=document.location.href;
    var cad=url.split('?');
    var producto=cad[1];
    
    switch (producto){
        case 'invictus':
            document.title='Invictus 2.0';
            $('li.disabled').text('Invictus 2.0');
            $('.fotoPrincipal').attr('src','imgProduct/invictus1.jpg');
            $('.min1').attr('src','imgProduct/invictus1.jpg');
            $('.min2').attr('src','imgProduct/invictus2.jpg');
            $('.min3').attr('src','imgProduct/invictus3.jpg');
            $('.min4').attr('src','imgProduct/invictus4.jpg');
            $('.min5').attr('src','imgProduct/invictus5.jpg');
            $('h3.titulo').text('Invictus 2.0');
            $('h4.nombreProducto').text('Invictus 2.0');
            $('.descripcionPrincipal').html('Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo,  utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología  revolucionaria...  <a href="#panel1">Leer más</a>');
            $('h5.precio').text('239 EURO');
            $('.descripcion').html(' <h5 class="textoDescripcion">Descripción</h5><p>Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo, utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología revolucionaria como es el “<i>Diaxagonal solid Frame</i>”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, esto unido al núcleo de EVA de alta densidad especialmente desarrollado para conjugar lo más certeramente los materiales utilizados en toda la estructura del pala hacen que la pala no genere ningún tipo de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente sea la mejor pala del mercado.</p><p>Una de sus características más singulares es su sonido en el golpeo, su manejabilidad con un control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr.</p><h5 class="textoDescripcion">Características técnicas</h5> <dl class="textoDescripcion"><dt>Plano</dt><dd>Carbón Extreme  + fiberglass</dd><dt>Nucleo</dt><dd>HIPER SOFT EVA alta densidad Legend</dd><dt>Tubular</dt><dd>Diaxagonal Solid frame</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h5 class="textoDescripcion">Diseño</h5><p>Diseñada por uno de los estudios de diseño mas importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía cromática con  el carbono visto</p>');
            if($('.masProductosInvictus').length > 0 ){
                $('.masProductosInvictus').remove();
            }
            break;

        case 'redSkin':
            document.title='Red Skin';
            $('li.disabled').text('Red Skin');
            $('.fotoPrincipal').attr('src','imgProduct/redskin1.jpg');
            $('.min1').attr('src','imgProduct/redskin1.jpg');
            $('.min2').attr('src','imgProduct/redskin2.jpg');
            $('.min3').attr('src','imgProduct/redskin3.jpg');
            $('.min4').attr('src','imgProduct/redskin4.jpg');
            $('.min5').attr('src','imgProduct/redskin5.jpg');
            $('h3.titulo').text('Red Skin');
            $('h4.nombreProducto').text('Red Skin');
            $('.descripcionPrincipal').html('Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100 % de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar,los planos de la pala están compuesto de carbono 3k con... <a href="#panel1">Leer más</a>');
            $('h5.precio').text('219 EURO');
            $('.descripcion').html('<h5 class="textoDescripcion descripcionCompleta">Descripción</h5><p class="textoDescripcion">Pala en forma redonda con un grosor de 38 milímetros. Su paricularidad reside en un doble tubular 100% de Kevlar, tejido de alta tecnología utilizado en la industria aeronáutica y sobre todo militar, los planos de la pala están compuesto de carbono 3k con un núcleo EVA media de alta densidad, esta combinación de materiales evita cualquier tipo  de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente se una de la mejores palas del mercado.</p> <p class="textoDescripcion">Este modelo nos brinda un juego de control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr. </p><h5 class="textoDescripcion caracteristicastecnicas">Características técnicas</h5><dl class="textoDescripcion"> <dt>Plano</dt> <dd>Carbón Extreme  + fiberglass</dd> <dt>Nucleo</dt> <dd>EVA HIPER Soft  Legend</dd> <dt>Tubular</dt> <dd>Kevlar frame  tech</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h5 class="textoDescripcion diseño">Diseño</h5><p class="textoDescripcion">Diseñada por uno estudio de diseño más importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía con los colores y el carbono visto en la parte central del logo de nuestra marca.</p>');
            if($('.masProductosRedSkin').length > 0 ){
                $('.masProductosRedSkin').remove();
            }
            break;

        case 'sniper':
            document.title='Sniper';
            $('li.disabled').text('Sniper');
            $('.fotoPrincipal').attr('src','imgProduct/sniper1.jpg');
            $('.min1').attr('src','imgProduct/sniper1.jpg');
            $('.min2').attr('src','imgProduct/sniper2.jpg');
            $('.min3').attr('src','imgProduct/sniper3.jpg');
            $('.min4').attr('src','imgProduct/sniper4.jpg');
            $('.min5').attr('src','imgProduct/sniper5.jpg');
            $('h3.titulo').text('Sniper');
            $('h4.nombreProducto').text('Sniper');
            $('.descripcionPrincipal').html('Pala en forma redonda con un grosor de 38 milímetros. Este pala cuanta con unas hendiduras que rodean a su corazón triangular, estas hendiduras no solo embellecen estéticamente a la pala sino que también son importantes a nivel estructural, la composición... <a href="#panel1">Leer más</a>');
            $('h5.precio').text('169 EURO');
            $('.descripcion').html('  <h5 class="textoDescripcion">Descripción</h5><p>Pala en forma redonda con un grosor de 38 milímetros. Este pala cuanta con unas hendiduras que rodean a su corazón triangular, estas hendiduras no solo embellecen estéticamente a la pala sino que también son importantes a nivel estructural, la composición de la  pala es de fibra de vidrio con refuerzos de carbono en sus puntos más críticos, pala muy equilibrada para jugadores principiantes con un núcleo de FOAM. </p> <p> Su peso oscila de 355 gr a 365 gr. </p> <h5 class="textoDescripcion">Características técnicas</h5> <dl class="textoDescripcion"> <dt>Plano</dt> <dd>100% ECO-fiberglass</dd> <dt>Nucleo</dt> <dd>FOAM EXPLOSSION</dd> <dt>Tubular</dt> <dd>Tubular de fibra reforzado</dd> <dt>Taladros</dt> <dd>Control holes + ativibration system</dd> </dl> <h5 class="textoDescripcion">Diseño</h5><p>Diseñada por uno estudio de diseño más importantes en la industria del deporte, este modelo está concebido para principiantes, su color dorado unto con un diseño con líneas muy sencillas y elegantes hacen de ella una pala muy elegante en cualquier pista.</p>');
            if($('.masProductosSniper').length > 0 ){
                $('.masProductosSniper').remove();
            }
            if($('.min5').length > 0 )
                $('.min5').remove();
            break;

        case 'target':
            document.title='Target 1.0';
            $('li.disabled').text('Target 1.0');
            $('.fotoPrincipal').attr('src','imgProduct/targetBlack1.jpg');
            $('.min1').attr('src','imgProduct/targetBlack1.jpg');
            $('.min2').attr('src','imgProduct/targetBlack2.jpg');
            $('.min3').attr('src','imgProduct/targetBlack3.jpg');
            $('.min4').attr('src','imgProduct/targetBlack4.jpg');
            $('.min5').attr('src','imgProduct/targetBlack5.jpg');
            $('h3.titulo').text('Target 1.0');
            $('h4.nombreProducto').text('Target 1.0');
            $('.descripcionPrincipal').html('Pala en forma redonda con un grosor de 38 milímetros. Pala de fibra de vidrio que incorpora nuestra tecnología revolucionaria como es el “Diaxagonal solid Frame”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más... <a href="#panel1">Leer más</a>');
            $('h5.precio').text('189 EURO');
            $('h5.precio').append('<div class="row"><div class="small-3 columns"><label  class="middle textoDescripcion">Color</label> </div> <div class="small-9 columns divColor"> <div class="caja" id="negro"><div class="negro colores"></div><span class="info">Negro</span></div> <div class="caja" id="blanco"><div class="blanco colores" ></div><span class="info">Blanco</span></div> </div> </div>');
            $('.descripcion').html(' <h5 class="textoDescripcion">Descripción</h5> <p>Pala en forma redonda con un grosor de 38 milímetros. Pala de fibra de vidrio que incorpora nuestra tecnología revolucionaria como es el “Diaxagonal solid Frame”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, su núcleo compuesto de FOAM de baja densidad de alta densidad unido a la mayor flexión de la fibra de vidrio  nos proporciona  un juego de ataque con una gran salida de bola sin perder el control de bola, muchos jugadores aseguran que las palas de fibra son las mejores dentro del mercado nosotros dejamos que eso lo decidáis vosotros una vez probéis esta hermosa y grandiosa pala. Este modelo lo podemos encontrar en dos combinaciones de colores, una en blanco perlado y otra con un negro brillo.</p><p>Su peso oscila de 355 gr a 365 gr.</p> <h5 class="textoDescripcion">Características técnicas</h5><dl class="textoDescripcion"> <dt>Plano</dt> <dd>100% fiberglass</dd><dt>Nucleo</dt><dd>FOAM EXPLOSSION</dd> <dt>Tubular</dt> <dd>Diaxagonal Solid frame</dd> <dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h5 class="textoDescripcion">Diseño</h5><p>Diseñada por uno estudio de diseño más importantes en la industria del deporte, este modelo lo podemos encontrar en dos combinaciones de colores a cual más espectacular, una con una base en blanco perlado y otra con una base de negro metálico, ambas con un rosa fluor como como color referente.</p>');
                if($('.masProductosTargetBlack').length > 0 ){
                $('.masProductosTargetBlack').remove();
            }
            break;
        
    }
    $('.anadirCarrito').on('click',function(){
        var cantidad=$('#cantidad').val();
        if(cantidad==""){
            alert('PRUEBA: no deje cantidad vacio');
        }else {
            localStorage.setItem('producto', producto);

            var cad ='{'+
                '"producto":"'+document.title+'",'+
                '"cantidad":"'+cantidad+'",'+
                '"precio":"'+$('h5.precio').text()+'"'+
                '}';

            var sParametro="datos="+cad;
            $.ajax({url: 'carrito.php', data: sParametro,success:function(){alert('Producto añadido')}});
       
        }
    });

});