$(document).ready(function(){
    $('.btn-crearCuenta').on('click',validarForm);
});

function validarForm(){
    mensaje=$('.mensaje');
    mensaje.text('');
    var nombre=$('#nombre').val();
    var apellidos=$('#apellidos').val();
    var dni=$('#dni').val();
    var direccion=$('#direccion').val();
    var telefono=$('#telefono').val();
    var email=$('#email').val();
    var password=$('#password').val();
    var password2=$('#password2').val();
    var error=false;

    var expNombre=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,15}$");
    var expApellidos=new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ\ ]{4,25}$");
    var expTelefono=new RegExp("^[9|6|7][0-9]{8}$");
    var expDni=new RegExp("^[0-9]{8}[a-zA-ZñÑ]$");
    var expEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$");
    var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");


    if(!expNombre.test(nombre)) {
        mensaje.addClass('alert-danger');
        mensaje.html('Nombre Incorrecto<br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(!expApellidos.test(apellidos)) {
        mensaje.addClass('alert-danger');
        mensaje.append('Apellidos Incorrecto<br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(!expTelefono.test(telefono)) {
        mensaje.addClass('alert-danger');
        mensaje.append('Teléfono Incorrecto<br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(direccion==""){
        mensaje.addClass('alert-danger');
        mensaje.append('La dirección no puede estar vacía<br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(!expDni.test(dni)) {
        mensaje.addClass('alert-danger');
        mensaje.append('Dni Incorrecto <br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(!expEmail.test(email)) {
        mensaje.addClass('alert-danger');
        mensaje.append('Email Incorrecto <br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(!expPass.test(password)) {
        mensaje.addClass('alert-danger');
        mensaje.append('Contraseña Incorrecta: La contraseña debe contener entre 6 y 15 caracteres, contener al menos una letra en mayúsculas y otra en minúsculas <br/>');
        mensaje.css('display','block');
        error=true;
    }
    if(password!=password2) {
        mensaje.addClass('alert-danger');
        mensaje.append('Las contraseñas no coinciden <br/>');
        mensaje.css('display','block');
        error=true;
    }

    if(error==false){
        mensaje.css('display','none');
        sessionStorage.setItem('lgdusr', email);
        //nombre', 'apellidos', 'dni', 'email', 'contraseña'
        var sJson='{'+
            '"nombre":"'+nombre+'",'+
            '"apellidos":"'+apellidos+'",'+
            '"telefono":"'+telefono+'",'+
            '"direccion":"'+direccion+'",'+
            '"dni":"'+dni+'",'+
            '"email":"'+email+'",'+
            '"password":"'+password+'"'+
            '}';

        $.ajax({
            url: "../php/usuarios.php",
            type: 'POST',
            data:"datos="+sJson,
            dataType: 'text',
            success: function(data) {
                sessionStorage.setItem('lgdusr', email);
               mensaje.addClass('alert-success');
                mensaje.text(data);
                mensaje.css('display','block');
                setTimeout("redirrecionar()", 5000);
            }
        });
         limpiarCampos();

    }

}

function limpiarCampos(){
    $('input').val('');
}
function redirrecionar(){
        window.location="http://localhost/legend-padel/";
    // window.location="http://www.legendpadel.com";
}
