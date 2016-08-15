
var img="";
var color="";

$(function() {
    $('.miniatura').on('click',function(){
        img=$(this).attr('src');
        abrirFoto(img);
    });
    $('.caja').on('click',function(){
        color=$(this).attr('id');
        cambiarColor(color);

    });
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