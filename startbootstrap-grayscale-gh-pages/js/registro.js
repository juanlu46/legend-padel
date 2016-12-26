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
    var provincia=$('#provincia').val();
    var localidad=$('#localidad').val();
    var cp=$('#cp').val();
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
    var expCP = new RegExp("^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$");



    if(!expNombre.test(nombre)) {
        mensaje.html('Nombre Incorrecto<br/>');
        error=true;
    }
    if(!expApellidos.test(apellidos)) {
        mensaje.append('Apellidos Incorrecto<br/>');
        error=true;
    }
    if(!expTelefono.test(telefono)) {
        mensaje.append('Teléfono Incorrecto<br/>');
        error=true;
    }
    if(direccion==""){
        mensaje.append('La dirección no puede estar vacía<br/>');
        error=true;
    }
    if(localidad==""){
        mensaje.append('La localidad no puede estar vacía<br/>');
        error=true;
    }
    if(provincia==""){
        mensaje.append('La provincia no puede estar vacía<br/>');
        error=true;
    }
    if(!expCP.test(cp)){
        mensaje.append('Código Postal Incorrecto<br/>');
        error=true;
    }
    if(!expDni.test(dni)) {
        mensaje.append('Dni Incorrecto <br/>');
        error=true;
    }
    if(!expEmail.test(email)) {
        mensaje.append('Email Incorrecto <br/>');
        error=true;
    }
    if(!expPass.test(password)) {
        mensaje.append('Contraseña Incorrecta: La contraseña debe contener entre 6 y 15 caracteres, contener al menos una letra en mayúsculas y otra en minúsculas <br/>');
        error=true;
    }
    if(password!=password2) {
        mensaje.append('Las contraseñas no coinciden <br/>');
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
            '"localidad":"'+localidad+'",'+
            '"provincia":"'+provincia+'",'+
            '"cp":"'+cp+'",'+
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
                if(data=='Email no valido' || data=='Datos incorrectos, introduzca un usuario válido' || data=='Se ha producido un error, este usuario ya existe'){
                    mensaje.addClass('alert-danger');
                    mensaje.text(data);
                    mensaje.css('display', 'block');
                }
                else {
                    sessionStorage.setItem('lgdusr', email);
                    mensaje.addClass('alert-success');
                    mensaje.text(data);
                    mensaje.css('display', 'block');
                    setTimeout("redirrecionar()", 5000);
                    limpiarCampos();
                }
            }
        });


    }
    else{
        mensaje.addClass('notice-danger');
        mensaje.css('display','block');
    }

}

function limpiarCampos(){
    $('input').val('');
}
function redirrecionar(){
        window.location="http://localhost/legend-padel/";
    // window.location="http://www.legendpadel.com";
}
