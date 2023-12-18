// Obtén referencias a los elementos del formulario de registro
const registrationForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Agrega un evento al formulario de registro para manejar el registro de usuario
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Intenta registrar al usuario en Firebase
    firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => {
            // Éxito: El usuario ha sido registrado
            console.log('Usuario registrado exitosamente');
            // Limpiar campos del formulario después del registro
            usernameInput.value = '';
            passwordInput.value = '';
            errorMessage.textContent = '';

            // Puedes redirigir al usuario a la página de inicio de sesión, por ejemplo
            window.location.href = '../'; // Reemplaza 'login.html' con la URL de tu página de inicio de sesión
        })
        .catch(error => {
            // Error: Muestra un mensaje de error personalizado al usuario
            handleRegistrationError(error);
        });
});

// Función para manejar errores de registro y mostrar mensajes personalizados
function handleRegistrationError(error) {
    switch (error.code) {
        case "auth/email-already-in-use":
            errorMessage.textContent = "Este correo electrónico ya está en uso. Por favor, utiliza otro.";
            break;
        case "auth/invalid-email":
            errorMessage.textContent = "Correo electrónico inválido. Por favor, verifica tu correo electrónico.";
            break;
        case "auth/weak-password":
            errorMessage.textContent = "Contraseña débil. Por favor, utiliza una contraseña más segura.";
            break;
        default:
            errorMessage.textContent = "Ocurrió un error durante el registro. Por favor, inténtalo nuevamente.";
    }
}
