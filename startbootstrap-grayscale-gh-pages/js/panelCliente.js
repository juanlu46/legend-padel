$(document).ready(function() {
    var email = "";
    if (sessionStorage.getItem('lgdusr') == null)
        email = 'emailUser=' + localStorage.getItem('lgdusr');
    else
        email = 'emailUser=' + sessionStorage.getItem('lgdusr');

    if (email == 'emailUser=null') {
        $('.container').css({
            "width": "100%",
            "height": "100%",
            "background": "#070303",
            "opacity": "0.8",
            "position": "fixed",
            "top": "0px",
            "filter": "blur(5px)"
        });
        var mensajes = $('.mensajesUsuarios');
        mensajes.addClass('notice-danger');
        mensajes.css({
            "display": "block",
            "color": "black",
            "filter": "blur(0px)"
        });
        mensajes.html('<h3>Debe iniciar sesión</h3>Para iniciar sesión pulse <a class="iniciarSesion" href="../index.html?login">aquí</a>');
        stopEvent();
    }

    $.get('../php/devuelveCliente.php', email, function (data) {
        var jsonCliente = JSON.parse(data);
        cargarDatosCliente(jsonCliente);
        $('.guardar').on('click', function () {
            guardarCambios(jsonCliente);
        });
    });
    $('.limpiarForm').on('click', limpiarForm);

    $('.btn-MisPedidos').on('click',function(){
        cargarPedidos(email);
    });
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
            if (!expPass.test(password)) {
                mensajes.addClass('notice-danger');
                mensajes.append('Nueva Contraseña Incorrecta: La contraseña debe contener entre 6 y 15 caracteres, contener al menos una letra en mayúsculas y otra en minúsculas <br/>');
                mensajes.css('display', 'block');
                error = true;
            }
            if (password != password2) {
                mensajes.addClass('notice-danger');
                mensajes.append('Las nuevas contraseñas no coinciden <br/>');
                mensajes.css('display', 'block');
                error = true;
            }

            if (error == false) {
                mensajes.css('display', 'none');
                sessionStorage.setItem('lgdusr', email);
                //nombre', 'apellidos', 'dni', 'email', 'contraseña'
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
                        sessionStorage.setItem('lgdusr', email);
                        mensajes.addClass('notice-success');
                        mensajes.text(data);
                        mensajes.css('display', 'block');
                        setTimeout("redirrecionar()", 5000);
                    }
                });
            }
        }
        else {
            mensajes.addClass('notice-danger');
            mensajes.append('Contraseña Incorrecta');
            mensajes.css('display', 'block');
        }
    }

    function stopEvent() {
        var link = $("a");
        $(link).on('click', function () {
            return false;
        });

        $('.guardar').off();
        $('.limpiarForm').off();
    }

    function cargarPedidos(email) {
        $('.form-Edicion').css('display', 'none');
        $('.misPedidos').css('display', 'block');

        $.get('../php/devuelveCliente.php',email,function(data){
            var jsonCliente = JSON.parse(data);
            var dni='usuario='+jsonCliente.dni;
            $.get('../php/devolverPedidos.php',dni,function(data){
                if(data=='<h3>Email no valido</h3>' || data=="" ){
                    var mensajes = $('.mensajesUsuarios');
                    mensajes.addClass('notice-danger');
                    mensajes.append(data);
                    mensajes.css('display', 'block'); 
                }
                else {

                    if($('.item-defecto').length>0){
                        $('.item-defecto').remove();
                    }
                    $('.list-group-item').remove();



                    for(var i=0;i<data.length;i++) {
                        var nuevoItem = $('<i href="#" class="list-group-item active"><div class="media col-md-3"><figure class="pull-left">' +
                            '<img class="media-object img-rounded img-responsive imagenPedido" src="#" alt="Producto"></figure></div><div class="col-md-6">' +
                            '<h4 class="list-group-item-heading titulo"></h4><p class="list-group-item-text descripcion"></p> </div> ' +
                            '<div class="col-md-3 text-center"><h2><small></small></h2>' +
                            ' <button type="button" class="btn btn-default btn-lg btn-block btn-eliminar">Eliminar</button> </div> </i>');

                        $('.list-group').append(nuevoItem);

                        if (data[0]['id'] == 'invictus2') {
                            while(data[0]['cantidad']>1)
                                $('.list-group-item').remove();
                            $('.titulo').text('Invictus 2.0');
                            $('.imagenPedido').attr('src','../img/imgProduct/invictus2.jpg');
                        }

                    }
                }
                

            });
        });


        
    }
