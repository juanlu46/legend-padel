
// Ajustar Navbar
function ajustarNavBar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(ajustarNavBar);
$(document).ready(function(){
    actualizarCarrito();
    ajustarNavBar();
    $(".marca-titulo").addClass("animated zoomInDown");
    $(".es1").addClass("animated fadeInLeftBig");
    $(".es2").css('visibility','visible').addClass("animated fadeInRightBig");
    /*** copiar cuando se cargue quienes somos ***/
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.7";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $(".service,.service-tw").hover(function(){
        $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-down': '170px', 'padding-left': '0'},300);
    },function(){
        $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-down': '0', 'padding-left': '0'},300);
    });
    $(".service-ig").hover(function(){
        $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-down': '170px', 'padding-left': '0'},300);
    },function(){
        $("#quienes-somos").stop(true).animate({'padding-top':'100px','padding-right': '0','padding-down': '0', 'padding-left': '0'},300);
    });
    $(".btn-identificate").on("click",cargarFormIdent);
    $('.btn-signin').on("click",validarLogin);
    /*********/

});

// Controlador de scroll
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//Cierra los menús al hacer click
$('.navbar-collapse ul li a').click(function() {
    $(this).closest('.collapse').collapse('toggle');
});

function cargarFormIdent(){
    var inputEmail=$("#inputEmail");
    inputEmail.val("");
    $("#inputPassword").val("");
    $('.ContentLogin').css('display','block');
    $('.desenfoque').css('display','block');
    if(sessionStorage.getItem('lgdusr')!=null){
        inputEmail.val(sessionStorage.getItem('lgdusr'));
    }
    if(localstorage.getItem('lgdusr')!=null ){
        inputEmail.val(localstorage.getItem('lgdusr'));
    }

}
/* JS DE LOGIN */
function validarLogin(){
    var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
    var email=$("#inputEmail").val();
    var mendaje=$(".mensaje");

    //Verifica la existencia de una letra minuscula(?=.*[a-z])  y (?=.*[A-Z]) la de una letra en mayusculas.
// Por ultimo la longitud la verificamos con los valores entre llaves {6,15}.
    var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");
    var password=$("#inputPassword").val();

    if(!expEmail.test(email)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Email Incorrecto');
        mendaje.css('display','block');
    }

   else if(!expPass.test(password)) {
        mendaje.addClass('alert-danger');
        mendaje.text('Contraseña Incorrecta');
        mendaje.css('display','block');
        }
    else if(!expEmail.test(email) && !expPass.test(password) ){
        mendaje.addClass('alert-danger');
        mendaje.text('Email y Contraseña Incorrectos');
        mendaje.css('display','block');
    }
    else{
        sessionStorage.setItem('lgdusr', email);
        $('.ContentLogin').css('display','none');
        $('.desenfoque').css('display','none');
        var  arrayJson='{"email":"'+email+'",'+
            '"password":"'+password+'"}';
        $.ajax({url:"php/usuarios.php" ,data:"datos="+arrayJson,method:'POST'});
    }

    if($('#chkRecordar').prop('checked')) {
        localstorage.setItem('lgdusr',email);
    }


}

/* carrito */
function actualizarCarrito(){

    if(sessionStorage.getItem("lgdusr")==null){
        if(sessionStorage.getItem("nusrcrt")!=null){
            sCarrito=sessionStorage.getItem("nusrcrt");
            oCarrito=JSON.parse(sCarrito);
            var nElementos=0;
            for(i=0; i<oCarrito.length;i++){
                nElementos+=oCarrito[i][1];
            }
            $(".carrito_n_productos").text(nElementos);
           $.get('php/montarNavCarrito.php',sCarrito,function(sProductos){
                $('.dropdown-cart').find('li').first().before(sProductos);
           });
        }
        else{
            $('.dropdown-cart').find('li').first().before('<li class="text-center">El carrito está vacío</li>');
        }
    }
    else{
        sSesion=sessionStorage.getItem("lgdusr");
        $.get('php/montarNavCarrito.php',sSesion,function(sProductos){
            $('.dropdown-cart').find('li').first().before(sProductos);
        });
    }
}
