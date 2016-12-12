
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
    ajustarNavBar();
    $(".marca-titulo").addClass("animated zoomInDown");
    $(".es1").addClass("animated fadeInLeftBig");
    $(".es2").css('visibility','visible').addClass("animated fadeInRightBig")
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



