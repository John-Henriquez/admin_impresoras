// src/pages/UpdatePrint.jsx
import React, { useState } from 'react';
import { updatePrint } from '../services/print.service';

const UpdatePrint = () => {
  const [identifier, setIdentifier] = useState(''); // estado para almacenar el ID de la impresión
  const [updatedData, setUpdatedData] = useState(''); // estado para almacenar los datos actualizados como cadena
  const [message, setMessage] = useState(''); // estado para almacenar el mensaje de éxito
  const [error, setError] = useState(null); // estado para almacenar cualquier error
  const [loading, setLoading] = useState(false); // estado para manejar la carga

  // Función para manejar la actualización de la impresión
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      // Validación de inputs
      if (!identifier.trim()) {
        throw new Error('Debes ingresar un ID de impresión válido');
      }

      // Intenta parsear el JSON antes de realizar la actualización
      let parsedData;
      try {
        parsedData = JSON.parse(updatedData);
      } catch {
        throw new Error('Error al parsear el JSON. Asegúrate de que el formato sea válido.');
      }

      if (Object.keys(parsedData).length === 0) {
        throw new Error('Debes ingresar datos a actualizar válidos');
      }

      // Llamada a la función updatePrint del servicio
      await updatePrint(identifier, parsedData);
      setMessage('Impresión actualizada correctamente');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio en el textarea
  const handleTextareaChange = (e) => {
    setUpdatedData(e.target.value);
    setError(null);
  };

  // Función para manejar el cambio en el input de ID
  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <main className="update_print_page">
      <h2>Actualizar Impresión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            ID de Impresión:
            <input
              type="text"
              value={identifier}
              onChange={handleIdentifierChange} // actualiza el estado identifier
              placeholder="Introduce el ID de impresión"
            />
          </label>
        </div>
        <div>
          <label>
            Datos a Actualizar:
            <textarea
              value={updatedData}
              onChange={handleTextareaChange} // actualiza el estado updatedData
              placeholder='{"clave": "valor"}'
              rows="10"
              cols="30"
            />
          </label>
        </div>
        <button type="submit">Actualizar</button> {/* botón para iniciar la actualización */}
      </form>
      {loading && <h2>Cargando...</h2>}
      {message && <div>{message}</div>} {/* muestra el mensaje de éxito */}
      {error && <div style={{ color: 'red' }}>{error.message}</div>} {/* muestra el error si existe */}
    </main>
  );
};

export default UpdatePrint;
