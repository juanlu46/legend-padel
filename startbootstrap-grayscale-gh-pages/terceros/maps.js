var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.5442706, lng:-4.727752799999962},
        zoom: 6
    });
    var infinityIndoor = new google.maps.LatLng(37.312651, -5.975999);
    var posInifinity = new google.maps.Marker({
        position: infinityIndoor
        , title: 'Infinity Indoor'
        , map: map
    });
    var cadInfinity = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Infinity Indoor</b></p><p><i>Adalid domingo de Ledesma 9, Fuente del rey</i></p>'+
        '</div>';

    var Padelissimo = new google.maps.LatLng(37.342568927488976, -6.05579714418036);
    var posPadelissimo = new google.maps.Marker({
        position: Padelissimo
        , title: 'Padelissimo'
        , map: map
    });
    var cadPadelissimo = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Padelissimo</b></p><p><i>Avd de las civilizaciones 95, Mairena del aljarafe</i></p>'+
        '</div>';

    var MatchPoint = new google.maps.LatLng(37.3455642,-5.9390856);
    var posMatchPoint = new google.maps.Marker({
        position: MatchPoint
        , title: 'Match Point'
        , map: map
    });
    var cadMatchPoint = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Match Point</b></p><p><i>Calle Via Apia 24, Dos hermanas</i></p>'+
        '</div>';

    var bernier = new google.maps.LatLng(37.33162148684854,-6.031992653967336);
    var posbernier = new google.maps.Marker({
        position: bernier
        , title: 'Club Bernier'
        , map: map
    });
    var cadbernier = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Club Bernier</b></p><p><i>s/n (Urb. Maestranza-Simón Verde), Calle Brasil, Gelves, Sevilla</i></p>'+
        '</div>';
    var helechos = new google.maps.LatLng(36.912642,-6.083060);
    var poshelechos = new google.maps.Marker({
        position: helechos
        , title: 'Club los Helechos'
        , map: map
    });
    var cadhelechos = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Club los Helechos</b></p><p><i>Calle darro, Lebrija</i></p>'+
        '</div>';

    var marathonU = new google.maps.LatLng(38.01138660000001,-3.3770183000000316);
    var posmarathonU = new google.maps.Marker({
        position: marathonU
        , title: 'Marathon ubeda'
        , map: map
    });
    var cadmarathonU = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Marathon ubeda</b></p><p><i>Avenida Cristo Rey, 7, Úbeda</i></p>'+
        '</div>';

    var padelIndoor = new google.maps.LatLng(37.17339949112223,-5.925584314680464);
    var pospadelIndoor = new google.maps.Marker({
        position: padelIndoor
        , title: 'Club Padel X4 Indoor'
        , map: map
    });
    var cadpadelIndoor = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Club Padel X4 Indoor</b></p><p><i>Plaza Almudeyne, 41720 Los Palacios y Villafranca, Sevilla</i></p>'+
        '</div>';
    var ribera = new google.maps.LatLng(39.2779986,-0.5637169999999969);
    var posribera = new google.maps.Marker({
        position: ribera
        , title: 'Club la Ribera'
        , map: map
    });
    var cadribera = '<div id="content">'+
        '<div id="bodyContent" style="color:black;padding-top: 1em">'+
        '<p><b>Club la Ribera</b></p><p><i>Calle industria 9, Alfarp Valencia</i></p>'+
        '</div>';
    //eventos de lista
    document.getElementById('Infinity').addEventListener('click', function(){showInfo(cadInfinity,posInifinity)()},false);
    document.getElementById('Padelissimo').addEventListener('click', function(){showInfo(cadPadelissimo,posPadelissimo)()},false);
    document.getElementById('Math').addEventListener('click', function(){showInfo(cadMatchPoint,posMatchPoint)()},false);
    document.getElementById('bernier').addEventListener('click', function(){showInfo(cadbernier,posbernier)()},false);
    document.getElementById('helechos').addEventListener('click', function(){showInfo(cadhelechos,poshelechos)()},false);
    document.getElementById('Marathon').addEventListener('click', function(){showInfo(cadmarathonU,posmarathonU)()},false);
    document.getElementById('PadelX4').addEventListener('click', function(){showInfo(cadpadelIndoor,pospadelIndoor)()},false);
    document.getElementById('ribera').addEventListener('click', function(){showInfo(cadribera,posribera)()},false);

    //eventos de marcadores
    google.maps.event.addListener(posInifinity, 'click', function(){showInfo(cadInfinity,posInifinity)()});
    google.maps.event.addListener(posPadelissimo, 'click', function(){showInfo(cadPadelissimo,posPadelissimo)()});
    google.maps.event.addListener(posMatchPoint, 'click', function(){showInfo(cadMatchPoint,posMatchPoint)()});
    google.maps.event.addListener(posbernier, 'click', function(){showInfo(cadbernier,posbernier)()});
    google.maps.event.addListener(poshelechos, 'click', function(){showInfo(cadhelechos,poshelechos)()});
    google.maps.event.addListener(posmarathonU, 'click', function(){showInfo(cadmarathonU,posmarathonU)()});
    google.maps.event.addListener(pospadelIndoor, 'click', function(){showInfo(cadpadelIndoor,pospadelIndoor)()});
    google.maps.event.addListener(posribera, 'click', function(){showInfo(cadribera,posribera)()});

    function showInfo(contentString,posicion) {
        map.setZoom(18);
        map.setCenter(posicion.getPosition());

        var infowindow = new google.maps.InfoWindow({

            content: contentString});
        infowindow.open(map,posicion);
    }




}
