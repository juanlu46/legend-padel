
var img="";
$(function() {
    $('.miniatura').on('click',function(){
        img=$(this).attr('src');
        abrirFoto(img);
    });
});

function abrirFoto(img) {
    $('.fotoPrincipal').attr('src',img);
}