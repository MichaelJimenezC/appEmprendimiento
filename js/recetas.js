document.addEventListener("DOMContentLoaded", function () {
    const recetasContainer = document.getElementById("recetasContainer");

    // Cargar datos desde el archivo JSON
    fetch("../recetas.json")
        .then(response => response.json())
        .then(data => {
            // Datos de recetas
            const recetas = data.recetas_saludables;

            // Generar tarjetas de recetas
            recetas.forEach(receta => {
                const recetaCard = document.createElement("div");
                recetaCard.className = "receta-card";

                const imagen = document.createElement("img");
                imagen.className = "receta-img";
                imagen.src = "../images/"+receta.imagen;
                imagen.alt = receta.nombre;

                const info = document.createElement("div");
                info.className = "receta-info";
                info.innerHTML = `<h3>${receta.nombre}</h3>`;

                const verMasBtn = document.createElement("a");
                verMasBtn.href = "#"; // Puedes agregar una URL real o un identificador para la página de detalles
                verMasBtn.className = "ver-mas-btn";
                verMasBtn.textContent = "Ver más detalles";
                verMasBtn.addEventListener("click", function (event) {
                    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
                    mostrarRecetaModal(receta);
                });
                recetaCard.appendChild(imagen);
                recetaCard.appendChild(info);
                recetaCard.appendChild(verMasBtn);

                recetasContainer.appendChild(recetaCard);
            });
        })
        .catch(error => console.error("Error al cargar datos:", error));
});

function mostrarRecetaModal(receta) {
     // Eliminar cualquier instancia previa del modal si existe
     $('#recetaModal').modal('hide');
     $('#recetaModal').remove();
    // Crear el contenido del modal dinámicamente
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Crear el encabezado del modal
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h5 class="modal-title">${receta.nombre}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>`;
    
    // Crear el cuerpo del modal
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    // Agregar la imagen al cuerpo del modal con clases de Bootstrap
    const imagenModal = document.createElement("img");
    imagenModal.className = "modal-img img-fluid";  // Agregamos la clase img-fluid para que la imagen sea responsive
    imagenModal.src = "../images/" + receta.imagen;

    imagenModal.alt = receta.nombre;
    modalBody.appendChild(imagenModal);

    // Agregar los pasos al cuerpo del modal
    const pasosTitle = document.createElement("h6");
    pasosTitle.textContent = "Pasos para preparar:";
    modalBody.appendChild(pasosTitle);

    const pasosListModal = document.createElement("ul");
    receta.pasos.forEach((paso, index) => {
        const li = document.createElement("li");
        li.textContent = `Paso ${index + 1}: ${paso}`;
        pasosListModal.appendChild(li);
    });
    modalBody.appendChild(pasosListModal);

    // Agregar el encabezado y el cuerpo al contenido del modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // Crear el modal
    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-dialog-centered";  // Agregamos la clase modal-dialog-centered para centrar horizontal y verticalmente
    modalDialog.appendChild(modalContent);

    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "recetaModal";
    modal.tabIndex = "-1";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "recetaModalLabel");
    modal.setAttribute("aria-hidden", "true");
    modal.appendChild(modalDialog);

    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);

    // Mostrar el modal utilizando Bootstrap
    $('#recetaModal').modal('show');
}
