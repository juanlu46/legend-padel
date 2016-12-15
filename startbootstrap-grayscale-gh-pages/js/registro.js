$(document).ready(function(){
    $('.btn-crearCuenta').on('click',validarForm);




});

function validarForm(){
    var nombre=$('#nombre').val();
    var apellidos=$('#apellidos').val();
    var dni=$('#dni').val();
    var email=$('#email').val();
    var contraseña=$('#password').val();
    var contraseña2=$('#password2').val();

    var expNombre=new RegExp("/^[a-z\d_]{4,15}$/i");
    var expApellidos=new RegExp("/^[a-z\d_]{4,15}$/i");
    var expDni=new RegExp("/^\d{8}[a-zA-Z]$/");
    var expEmail = new RegExp("^[A-Za-z]*[_a-z0-9-]+(\.[_A-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$");
    var expPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{6,15}$");

}