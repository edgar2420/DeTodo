document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const nombre = document.getElementById('name').value;
    const apellido = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
      nombre,
      apellido,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const result = await response.json();
      alert('Registro exitoso!');
      console.log('Registro exitoso:', result);
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el registro. Por favor, intente nuevamente.');
    }
  });