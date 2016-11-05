$(function() {
    var url= window.location.href;
    var producto=url.split('?')[1];

    $('.nav-tabs > li > a').click(function(event){
        //...... logic to hide and show tab content
    });

    switch (producto){
        case 'invictus':
            $('#item-display').attr('src','img/productos/pala1.jpg');
            $('.product-title h2').text('INVICTUS 2.0');
            $('.product-desc p').html('Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo, utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología revolucionaria...<a href="#service-one">Leer más</a>');
            $('.product-price').text('239,00 €');
            $('.tituloProduct').text('INVICTUS 2.0');
            $('.descripcionProduct').html(' <h4 class="textoDescripcion">Descripción</h4><p>Pala en forma redonda con un grosor de 38 milímetros. Es la evolución tecnológica más puntera de nuestra marca en el que se dedicado más de un año en su desarrollo, utilizando los materiales de mayor calidad del mercado además de introduciendo una nueva tecnología revolucionaria como es el “<i>Diaxagonal solid Frame</i>”, un doble tubular macizo que estructuralmente hace prácticamente irrompible a la pala en la zonas más críticas, esto unido al núcleo de EVA de alta densidad especialmente desarrollado para conjugar lo más certeramente los materiales utilizados en toda la estructura del pala hacen que la pala no genere ningún tipo de vibración que pudiera ocasionar lesiones asi como hacernos gozar y aprovechar todas las capacidades de lo que seguramente sea la mejor pala del mercado.</p><p>Una de sus características más singulares es su sonido en el golpeo, su manejabilidad con un control de bola exquisito con una potencia precisa, todo proporcionado en gran parte es su peso perfectamente  equilibrado que oscila de 360 gr a 375gr.</p><h4 class="textoDescripcion">Características técnicas</h4> <dl class="textoDescripcion"><dt>Plano</dt><dd>Carbón Extreme  + fiberglass</dd><dt>Nucleo</dt><dd>HIPER SOFT EVA alta densidad Legend</dd><dt>Tubular</dt><dd>Diaxagonal Solid frame</dd><dt>Taladros</dt><dd>Control holes + ativibration system</dd></dl><h4 class="textoDescripcion">Diseño</h4><p>Diseñada por uno de los estudios de diseño mas importantes en la industria del deporte, su espectacularidad visual hace atractiva a la pala en el primer abrir y cerrar de ojos, integrando el diseño en perfecta armonía cromática con  el carbono visto</p>');
            if($('.masProductosInvictus').length > 0 ){
                $('.masProductosInvictus').remove();
            }
            break;

    }


});