$(document).ready(inicio);

function inicio(){
    if(sessionStorage.getItem('lgdusr')!=null) {
        $.get('../php/montarResumenPedido.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')) , function (sProductos) {
            $('.productos').append(sProductos);
            $('.m-progress').css('display', 'none');
            $('.panel-pedido').css('display','block');
        });
    }
    else{
        // NO HA INICIADO SESION
    }
}
