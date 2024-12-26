//SIDE MENU IZQUIERDO

document.addEventListener('DOMContentLoaded', function() {
  // Obtenga los elementos del menú y las secciones de contenido
  const menuItems = document.querySelectorAll('.menu a');
  const contentSections = document.querySelectorAll('.content-section');

  // Comprobar si se encuentran secciones de contenido
  if (contentSections.length === 0) {
    console.error('No se encontraron secciones de contenido!');
    return; // Salir si no se encuentran secciones de contenido
  }

  // Agregue un detector de eventos de clic a cada elemento del menú
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      // Eliminar clase activa de todos los elementos del menú
      menuItems.forEach(item => item.classList.remove('active'));

      // Agregar clase activa al elemento del menú en el que se hizo clic
      this.classList.add('active');

      // Ocultar todas las secciones de contenido y remover la clase activa
      contentSections.forEach(section => section.classList.add('hidden'));
      contentSections.forEach(section => section.classList.remove('active'));

      // Mostrar la sección de contenido correspondiente al elemento del menú en el que se hizo clic
      const contentSectionId = this.getAttribute('href');
      const contentSection = document.querySelector(contentSectionId);
      contentSection.classList.remove('hidden');
      contentSection.classList.add('active');

    });
  });

  // Mostrar inicialmente la primera sección de contenido (Perfil)
  contentSections[0].classList.remove('hidden');
});

//CARGAR MATERIAS de USUARIO
const materiasContainer = document.getElementById('materias-table-container');

function displayMaterias() {
    fetch('./user.php') // Replace with the actual URL of your PHP script
        .then(response => response.json())
        .then(materiasData => {
            for (const materiaId in materiasData) {
                const materia = materiasData[materiaId];

                const materiaElement = document.createElement('div');
                materiaElement.classList.add('materia');
                materiaElement.addEventListener('click', () => {
                    // Handle materia click event (e.g., show more detalles)
                    alert('Materia seleccionada: ' + materia.titulo);
                });

                const imagenElement = document.createElement('img');
                imagenElement.src = materia.imagen;
                materiaElement.appendChild(imagenElement);

                const tituloElement = document.createElement('h3');
                tituloElement.textContent = materia.titulo;
                materiaElement.appendChild(tituloElement);

                const descripcionElement = document.createElement('p');
                descripcionElement.textContent = materia.descripcion.substring(0, 50) + '...'; // Truncate description
                materiaElement.appendChild(descripcionElement);

                const progresoElement = document.createElement('div');
                progresoElement.classList.add('progreso');

                const progresoBarElement = document.createElement('div');
                progresoBarElement.classList.add('progreso-bar');
                progresoBarElement.style.width = materia.avance + '%';
                progresoElement.appendChild(progresoBarElement);

                materiaElement.appendChild(progresoElement);

                materiasContainer.appendChild(materiaElement);
            }
        })
        //.catch(error => {
          //  console.error('Error fetching materias data:', error);
        //});
}

displayMaterias(); // Call the function to display materias on page load
