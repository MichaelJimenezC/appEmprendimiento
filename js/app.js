// Importa el módulo de autenticación de Firebase
const auth = firebase.auth();

// Obtén referencias a los elementos del formulario
const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Agrega un evento al formulario para manejar el inicio de sesión
loginForm.addEventListener('submit', function(event) {
   event.preventDefault();

   const username = usernameInput.value;
   const password = passwordInput.value;

   // Intenta iniciar sesión con Firebase
   auth.signInWithEmailAndPassword(username, password)
      .then(() => {
         // Éxito: El usuario ha iniciado sesión
         console.log('Inicio de sesión exitoso');
         // Limpiar campos del formulario después del inicio de sesión
         usernameInput.value = '';
         passwordInput.value = '';
         errorMessage.textContent = '';

         // Redirigir a la nueva página después del inicio de sesión exitoso
         window.location.href = 'public/app.html'; // Reemplaza 'nueva_pagina.html' con la URL de tu nueva página
      })
      .catch(error => {
         // Error: Muestra un mensaje de error personalizado al usuario
         handleLoginError(error);
      });
});

// Función para manejar errores de inicio de sesión y mostrar mensajes personalizados
function handleLoginError(error) {
   switch (error.code) {
      case "auth/user-not-found":
         errorMessage.textContent = "Usuario no encontrado. Por favor, verifica tu correo electrónico.";
         break;
      case "auth/wrong-password":
         errorMessage.textContent = "Contraseña incorrecta. Por favor, verifica tu contraseña.";
         break;
      default:
         errorMessage.textContent = "Ocurrió un error durante el inicio de sesión. Por favor, inténtalo nuevamente.";
   }
}

