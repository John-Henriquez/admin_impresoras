// src/pages/UpdatePrint.jsx
import React, { useState } from 'react'; // Importa React y el hook useState para manejar estados
import { updatePrint } from '../services/print.service'; // Importa la función updatePrint del servicio print

const UpdatePrint = () => {
  // Define el estado para almacenar el ID de la impresión
  const [identifier, setIdentifier] = useState('');
  // Define el estado para almacenar los datos actualizados como cadena
  const [updatedData, setUpdatedData] = useState('');
  // Define el estado para almacenar el mensaje de éxito
  const [message, setMessage] = useState('');
  // Define el estado para almacenar cualquier error que ocurra
  const [error, setError] = useState(null);
  // Define el estado para manejar la carga
  const [loading, setLoading] = useState(false);

  // Función para manejar la actualización de la impresión
  const handleUpdate = async () => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Resetea el estado de error
    setMessage(''); // Resetea el mensaje de éxito

    try {
      // Validación de inputs
      if (!identifier.trim()) {
        throw new Error('Debes ingresar un ID de impresión válido'); // Error si el ID está vacío
      }

      // Intenta parsear el JSON antes de realizar la actualización
      let parsedData;
      try {
        parsedData = JSON.parse(updatedData); // Parsea los datos actualizados del JSON
      } catch {
        throw new Error('Error al parsear el JSON. Asegúrate de que el formato sea válido.');
      }

      if (Object.keys(parsedData).length === 0) {
        throw new Error('Debes ingresar datos a actualizar válidos'); // Error si no hay datos válidos
      }

      // Llamada a la función updatePrint del servicio
      await updatePrint(identifier, parsedData);
      setMessage('Impresión actualizada correctamente'); // Mensaje de éxito
    } catch (err) {
      setError(err); // Actualiza el estado de error si ocurre uno
    } finally {
      setLoading(false); // Detiene el estado de carga una vez que se completa la solicitud
    }
  };

  // Función para manejar el cambio en el textarea
  const handleTextareaChange = (e) => {
    setUpdatedData(e.target.value); // Actualiza el estado updatedData
    setError(null); // Resetea el estado de error
  };

  // Función para manejar el cambio en el input de ID
  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value); // Actualiza el estado identifier
    setError(null); // Resetea el estado de error
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    handleUpdate(); // Llama a handleUpdate para iniciar la actualización
  };

  return (
    <main className="update_print_page">
      <h2>Actualizar Impresión</h2>
      <form onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
        <div>
          <label>
            ID de Impresión:
            <input
              type="text"
              value={identifier} // Valor del input asociado al estado identifier
              onChange={handleIdentifierChange} // Actualiza el estado identifier
              placeholder="Introduce el ID de impresión"
            />
          </label>
        </div>
        <div>
          <label>
            Datos a Actualizar:
            <textarea
              value={updatedData} // Valor del textarea asociado al estado updatedData
              onChange={handleTextareaChange} // Actualiza el estado updatedData
              placeholder='{"clave": "valor"}'
              rows="10"
              cols="30"
            />
          </label>
        </div>
        <button type="submit">Actualizar</button> {/* Botón para iniciar la actualización */}
      </form>
      {loading && <h2>Cargando...</h2>} {/* Muestra un mensaje de carga */}
      {message && <div>{message}</div>} {/* Muestra el mensaje de éxito */}
      {error && <div style={{ color: 'red' }}>{error.message}</div>} {/* Muestra el error si existe */}
    </main>
  );
};

export default UpdatePrint; // Exporta el componente UpdatePrint
