
$(document).ready(function() {
    if(sessionStorage.getItem('lgdusr')==null)
        var email='emailUser='+localStorage.getItem('lgdusr');
    else
        var email='emailUser='+sessionStorage.getItem('lgdusr');
    $.get('../php/devuelveCliente.php',email,function(data){
       var jsonCliente = JSON.parse(data);
        cargarDatosCliente(jsonCliente);
        $('.guardar').on('click',function(){
            guardarCambios(jsonCliente);
           });
    });
    $('.limpiarForm').on('click',limpiarForm);
   

});

function cargarDatosCliente(cliente){
    var legend=$('legend');
    legend.text('Datos Personales');
    legend.css('color', 'white');
    $('#nombre').val(cliente.nombre);
    $('#apellidos').val(cliente.apellidos);
    $('#direccion').val(cliente.direccion);
    $('#telefono').val(cliente.telefono);
    $('#email').val(cliente.email);
}
function limpiarForm(){
    $('input').val('');
}
function guardarCambios(cliente) {
    var passActual=$('#contraseñaActual').val();
    var mensajes = $('.mensajes');
    mensajes.text('');
    var nombre = $('#nombre').val();
    var apellidos = $('#apellidos').val();
    var direccion = $('#direccion').val();
    var telefono = $('#telefono').val();
    var email = $('#email').val();
    var password = $('#contraseña').val();
    var password2 = $('#contraseña2').val();
    var error = false;
    if(passActual==cliente.password) {
        var expNombre = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$");
        var expApellidos = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$");
        var expTelefono = new RegExp("^[9|6|7][0-9]{8}$");
        var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
        var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");


        if (!expNombre.test(nombre)) {
            mensajes.addClass('alert-danger');
            mensajes.html('Nombre Incorrecto<br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (!expApellidos.test(apellidos)) {
            mensajes.addClass('alert-danger');
            mensajes.append('Apellidos Incorrecto<br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (!expTelefono.test(telefono)) {
            mensajes.addClass('alert-danger');
            mensajes.append('Teléfono Incorrecto<br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (direccion == "") {
            mensajes.addClass('alert-danger');
            mensajes.append('La dirección no puede estar vacía<br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (!expEmail.test(email)) {
            mensajes.addClass('alert-danger');
            mensajes.append('Email Incorrecto <br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (!expPass.test(password)) {
            mensajes.addClass('alert-danger');
            mensajes.append('Nueva Contraseña Incorrecta: La contraseña debe contener entre 6 y 15 caracteres, contener al menos una letra en mayúsculas y otra en minúsculas <br/>');
            mensajes.css('display', 'block');
            error = true;
        }
        if (password != password2) {
            mensajes.addClass('alert-danger');
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
                    mensajes.addClass('alert-success');
                    mensajes.text(data);
                    mensajes.css('display', 'block');
                    setTimeout("redirrecionar()", 5000);
                }
            });
        }
    }
    else{
        mensajes.addClass('alert-danger');
        mensajes.append('Contraseña Incorrecta');
        mensajes.css('display', 'block');
    }
}