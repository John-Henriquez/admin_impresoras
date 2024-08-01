import React, { useState } from 'react';
import { updatePrint } from '../services/print.service';

const UpdatePrint = () => {
    const [identifier, setIdentifier] = useState(''); // estado para almacenar el id de la impresion
    const [updatedData, setUpdatedData] = useState({}); // estado para almacenar los datos actualizados
    const [message, setMessage] = useState(''); // estado para almacenar el mensaje de éxito
    const [error, setError] = useState(''); // estado para almacenar cualquier error

    // funcion para manejar la actualización de la impresion
    const handleUpdate = async () => {
        try {
            const data = await updatePrint(identifier, updatedData); // llama a la funcion updatePrint del servicio
            setMessage('Impresión actualizada correctamente'); // establece el mensaje de éxito
            setError(''); // limpia cualquier error previo
        } catch (err) {
            setError(err); // actualiza el estado con el error
            setMessage(''); // limpia el mensaje de éxito
        }
    };

    // Función para manejar el cambio en el textarea
    const handleTextareaChange = (e) => {
        try {
            const updatedData = JSON.parse(e.target.value);
            setUpdatedData(updatedData);
        } catch (err) {
            setError('Error al parsear el JSON');
        }
    };

    return (
        <div>
            <h2>Actualizar Impresión</h2>
            <div>
                <label>
                    ID de Impresión:
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)} // actualiza el estado id
                    />
                </label>
            </div>
            <div>
                <label>
                    Datos a Actualizar:
                    <textarea
                        value={JSON.stringify(updatedData, null, 2)}
                        onChange={handleTextareaChange} // actualiza el estado updatedData
                    />
                </label>
            </div>
            <button onClick={handleUpdate}>Actualizar</button> {/* botón para iniciar la actualización */}
            {message && <div>{message}</div>} {/* muestra el mensaje de éxito */}
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* muestra el error si existe */}
        </div>
    );
};

export default UpdatePrint;