$(document).ready(inicio);
function inicio(){
    $(document).foundation();
    $('.btnRegistro').on('click',cargarRegistro);
    $('.top-bar').on('sticky.zf.stuckto:top', function(){
        $(this).addClass('shrink');
    }).on('sticky.zf.unstuckfrom:top', function(){
        $(this).removeClass('shrink');
    });
    $.backstretch([
        "img/imgBG/img_bg_1.jpg",
        "img/imgBG/img_bg_2.jpg",
        "img/imgBG/img_bg_3.jpg"
    ], {
        fade: 700,
        duration: 5000
    });
    asignarEventos();
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

//hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

//on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function(){
        (!window.requestAnimationFrame)
            ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
            : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
    });

    var img="";
    var color="";

}

function asignarEventos(){
    $("#btn-tab-tec").on('click',cargarTabTec);
    $("#btn-tab-tienda").on('click',cargarTabTienda);
    $("#btn-tab-redes").on('click',cargarTabRedes);
    $("#btn-tab-galeria").on('click',cargarTabGaleria);
}

/*** METODOS DE CARGA ***/
function cargarTabTec(){

}
function cargarTabTienda(){
    if($(".productos").length<=0){
        $("#panel3").load("html/tab_tienda.html",function() {
            cargarNumProductosCesta();
//para la descripcion en las fotos
            var target = null;
            $('.img_thumb').hover(function(e){
                target = $(this);
                $(target[0].firstElementChild).fadeIn(200);
            }, function(){
                $(target[0].firstElementChild).fadeOut(200);
            });
        });
    }
}
function cargarTabRedes(){
    if($(".service-tw").length<=0){
        $("#panel4").load("html/tab_redes.html",function(){
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.7";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    }
}
function cargarTabGaleria(){
    if($(".slider-for").length<=0){
        $("#panel5").load("html/tab_galeria.html",function(){
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            var sliderNav=$(".slider-nav");
            sliderNav.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                arrows: true,
                dots: true,
                centerMode: true,
                focusOnSelect: true
            });
        });
    }
}

function hideBlocks(blocks, offset) {
    blocks.each(function(){
        ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    });
}

function showBlocks(blocks, offset) {
    blocks.each(function(){
        ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
}


function  redireccionar(producto) {
    document.location.href="productos.html?"+producto;
}
function cargarRegistro(){
    //CUANDO SE PULSA EL BOTON DE REGISTRO QUE SE ABRA UN ALERT CON EL FORMULARIO
    if($('.formularioRegistro').size() == 0 )
        $(".formLogin").load("formLogin.html");
    
    $('.contentLogin').css('display','block');

    $('.contenedor').css({
        'filter'         : 'blur(3px)',
        '-webkit-filter' : 'blur(3px)',
        '-moz-filter'    : 'blur(3px)',
        '-o-filter'      : 'blur(3px)',
        '-ms-filter'     : 'blur(3px)'
    });
    $('.backstretch ').css({
        'filter'         : 'blur(3px)',
        '-webkit-filter' : 'blur(3px)',
        '-moz-filter'    : 'blur(3px)',
        '-o-filter'      : 'blur(3px)',
        '-ms-filter'     : 'blur(3px)'
    });
    $('.item').addClass('difuminado');

    }

function cargarNumProductosCesta() {
   var total=localStorage.getItem('producto');
    if(total==null){
        var texto = $('<span>0 productos</span>');
        $('.optCarrito').append(texto);
    }
    else{

    }
}