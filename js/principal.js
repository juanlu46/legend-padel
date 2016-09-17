$(document).foundation();
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

var img="";
var color="";

$(function() {
    cargarNumProductosCesta();
    
    $('.btnRegistro').on('click',cargarRegistro);
    $('.miniatura').on('click',function(){
        img=$(this).attr('src');
        abrirFoto(img);
    });
    $('.caja').on('click',function(){
        color=$(this).attr('id');
        cambiarColor(color);

    });
   
    //para la descripcion en las fotos
    var target = null;
    $('.img_thumb').hover(function(e){
        target = $(this);
        $(target[0].firstElementChild).fadeIn(200);
    }, function(){
        $(target[0].firstElementChild).fadeOut(200);
    });
});

function abrirFoto(img) {
    $('.fotoPrincipal').attr('src',img);
}

function cambiarColor(color) {
    if(color=='negro'){
        $('.fotoPrincipal').attr('src','imgProduct/targetBlack1.jpg');
        $('.min1').attr('src','imgProduct/targetBlack1.jpg');
        $('.min2').attr('src','imgProduct/targetBlack2.jpg');
        $('.min3').attr('src','imgProduct/targetBlack3.jpg');
        $('.min4').attr('src','imgProduct/targetBlack4.jpg');
        if($('.min5').length > 0 )
            $('.min5').attr('src','imgProduct/targetBlack5.jpg');
        else{
            $('.columna5').prepend('<img class="thumbnail miniatura min5" src="imgProduct/targetblack5.jpg">');
        }

    }else{
        $('.fotoPrincipal').attr('src','imgProduct/targetwhite1.jpg');
        $('.min1').attr('src','imgProduct/targetwhite1.jpg');
        $('.min2').attr('src','imgProduct/targetwhite2.jpg');
        $('.min3').attr('src','imgProduct/targetwhite3.jpg');
        $('.min4').attr('src','imgProduct/targetwhite4.jpg');
        $('.min5').remove();
    }
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
    if(total==0){
        var texto = $('<spam>0 productos</spam>');
        $('.optCarrito').append(texto);
    }
}