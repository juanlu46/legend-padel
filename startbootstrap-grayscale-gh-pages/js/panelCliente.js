var pal='padelegend$01';
$(document).ready(function() {
    var url=window.location.href;
    var a=url.split('?');
    if(a[1]=='pedidos') {
        cargarPedidos(a);
    }
    var email = "";
    if (sessionStorage.getItem('lgdusr') != null) {
        $.get('../php/desencriptar.php?cadena='+encodeURIComponent(sessionStorage.getItem('lgdusr')),function(data){
            email =data;
            if (email == '') {
                $('.container').css({
                    "width": "100%",
                    "height": "100%",
                    "background": "#070303",
                    "opacity": "0.8",
                    "position": "fixed",
                    "top": "0px",
                    "filter": "blur(5px)"
                });
                var mensajes = $('.mensajelogin');
                mensajes.addClass('notice-danger');
                mensajes.css({
                    "display": "block",
                    "color": "black",
                    "filter": "blur(0px)"
                });
                mensajes.html('<h3>Debe iniciar sesión</h3>Para iniciar sesión pulse <a class="iniciarSesion" href="../index.html?login">aquí</a>');
                stopEvent();
            }
            else {
                var email2 = sessionStorage.getItem('lgdusr');
                $.get('../php/devuelveCliente.php?usuario=' + encodeURIComponent(email2), function (data) {
                    var jsonCliente = data;
                    cargarDatosCliente(jsonCliente);
                    $('.guardar').on('click', function () {
                        guardarCambios(jsonCliente);
                    });
                });
                $('.limpiarForm').on('click', limpiarForm);

                $('.btn-MisPedidos').on('click', function () {
                    cargarPedidos(email);
                });
            }
        });
    }


});
    function cargarDatosCliente(cliente) {
        var legend = $('legend');
        legend.text('Datos Personales');
        legend.css('color', 'white');
        $('#nombre').val(cliente.nombre);
        $('#apellidos').val(cliente.apellidos);
        $('#direccion').val(cliente.direccion);
        $('#telefono').val(cliente.telefono);
        $('#email').val(cliente.email);
    }

    function limpiarForm() {
        $('input').val('');
    }

    function guardarCambios(cliente) {
        var passActual = $('#contraseñaActual').val();
        var mensajes = $('.mensajesUsuarios');
        mensajes.text('');
        var nombre = $('#nombre').val();
        var apellidos = $('#apellidos').val();
        var direccion = $('#direccion').val();
        var telefono = $('#telefono').val();
        var email = $('#email').val();
        var password = $('#contraseña').val();
        var password2 = $('#contraseña2').val();
        var error = false;
        if (passActual == cliente.password) {
            var expNombre = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$");
            var expApellidos = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$");
            var expTelefono = new RegExp("^[9|6|7][0-9]{8}$");
            var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
            var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");


            if (!expNombre.test(nombre)) {
                mensajes.addClass('notice-danger');
                mensajes.html('Nombre Incorrecto<br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if (!expApellidos.test(apellidos)) {
                mensajes.addClass('notice-danger');
                mensajes.append('Apellidos Incorrecto<br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if (!expTelefono.test(telefono)) {
                mensajes.addClass('notice-danger');
                mensajes.append('Teléfono Incorrecto<br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if (direccion == "") {
                mensajes.addClass('notice-danger');
                mensajes.append('La dirección no puede estar vacía<br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if (!expEmail.test(email)) {
                mensajes.addClass('notice-danger');
                mensajes.append('Email Incorrecto <br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if(password!="" && password2!="") {
                if (!expPass.test(password)) {
                    mensajes.addClass('notice-danger');
                    mensajes.append('Nueva Contraseña Incorrecta: La contraseña debe contener entre 6 y 15 caracteres, contener al menos una letra en mayúsculas y otra en minúsculas <br/>');
                    mensajes.css('display', 'block');
                    error = true;
                }
            }
            if (password != password2) {
                mensajes.addClass('notice-danger');
                mensajes.append('Las nuevas contraseñas no coinciden <br/>');
                mensajes.css('display', 'block');
                error = true;
            }

            if (error == false) {
                mensajes.css('display', 'none');
                var res=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                 sessionStorage.setItem('lgdusr', res);

                if(password=="" && password2==""){
                  password=passActual;
                }
                var sJson = '{' +
                    '"nombre":"' + nombre + '",' +
                    '"apellidos":"' + apellidos + '",' +
                    '"telefono":"' + telefono + '",' +
                    '"direccion":"' + direccion + '",' +
                    '"email":"' + email + '",' +
                    '"dni":"' + cliente.dni + '",' +
                    '"password":"' + password + '"' +
                    '}';
                $.ajax({
                    url: "../php/actualizarUsuario.php",
                    type: 'POST',
                    data: "datos=" + sJson,
                    dataType: 'text',
                    success: function (data) {
                        if(data=='Los cambios se han guardado correctamente') {
                            var res=btoa(mcrypt.Encrypt(email,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
                            sessionStorage.setItem('lgdusr', res);
                            mensajes.removeClass('notice-danger');
                            mensajes.addClass('notice-success');
                            mensajes.text('Los cambios se han guardado correctamente');
                            setTimeout(function(){
                                mensajes.addClass("animated fadeOut");
                            },3000);
                            mensajes.css('display', 'block');
                            setTimeout("redirrecionar()", 5000);
                        }
                        else{
                            mensajes.removeClass('notice-success');
                            mensajes.addClass('notice-danger');
                            mensajes.text('Se ha producido un error al intentar actualizar los datos, revise los datos introducidos');
                            mensajes.css('display', 'block');
                            setTimeout(function(){
                                mensajes.addClass("animated fadeOut");
                            },3000);

                        }
                    }
                });
            }
        }
        else {
            mensajes.addClass('notice-danger');
            mensajes.append('Contraseña actual Incorrecta');
            setTimeout(function(){
                mensajes.addClass("animated fadeOut");
            },3000);
            mensajes.css('display', 'block');
        }
    }

    function stopEvent() {
        var link = $("a:not(.iniciarSesion)");
        $(link).on('click', function () {
            return false;
        });

        $('.guardar').off();
        $('.limpiarForm').off();
    }

    function cargarPedidos(email) {
        $('.form-Edicion').css('display', 'none');
        $('.misPedidos').css('display', 'block');

        $.get('../php/devuelveCliente.php?usuario='+encodeURIComponent(sessionStorage.getItem('lgdusr')),function(data){
            var codificar=data.dni;
            var dni=btoa(mcrypt.Encrypt(codificar,md5(md5(pal)),md5(pal),'rijndael-256','cbc'));
            $.get('../php/devolverPedidos.php?usuario='+encodeURIComponent(dni),function(data){
                if(data!="" ) {
                    if ($('.item-defecto').length > 0) {
                        $('.item-defecto').remove();
                    }
                    if ($('.pedido').length > 0) {
                        $('.pedido').remove();
                        $('.divider').remove();
                    }

                    $('.list-group').append(data);



                }
            });
        });
        $('.navbar-dark').css('height','100%');

        
    }
