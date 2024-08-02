// Importamos useState para manejar el estado del componente y useNavigate para redirigir después de la creación del dispositivo
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el componente Navbar y la función para crear un dispositivo
import Navbar from "../components/Navbar";
import { createDevice } from '../services/device.service';

// Componente para crear un nuevo dispositivo
const CreateDevice = () => {
    // Estado para manejar los datos del dispositivo
    const [deviceData, setDeviceData] = useState({
        id: '', // ID del dispositivo
        type: 'fotocopiadora', // Tipo de dispositivo con valor por defecto 'fotocopiadora'
        model: '', // Modelo del dispositivo
        modelnumber: '', // Número de modelo del dispositivo
        status: 'funcional', // Estado del dispositivo con valor por defecto 'funcional'
    });
    // Estado para manejar errores
    const [error, setError] = useState(null);
    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(false);

    // Hook para redireccionar a otra página después de crear el dispositivo
    const navigate = useNavigate();

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeviceData((prevData) => ({
            ...prevData,
            [name]: value && name == 'model' ? value.toUpperCase() : value, // Convertimos el modelo a mayúsculas
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        setError(null); // Resetea el estado de error
        setLoading(true); // Establece el estado de carga en verdadero
        try {
            // Llamamos a la función para crear el dispositivo con los datos proporcionados
            await createDevice(deviceData);
            alert('Dispositivo creado con éxito.'); // Muestra un mensaje de éxito
            navigate('/devices'); // Redirecciona a la página de dispositivos
        } catch (error) {
            setError(error); // Establece el estado de error con el error recibido
            console.error('Error creating device:', error); // Imprime el error en la consola
        } finally {
            setLoading(false); // Establece el estado de carga en falso
        }
    };

    return (
        <main className="main-container">
            <div className="device-table">
                <Navbar /> {/* Renderizamos el componente Navbar */}
                <div className="sections">
                    <h1>Añadir nuevo dispositivo</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para ingresar el ID del dispositivo */}
                        <div>
                            <label htmlFor="id">ID:</label>
                            <input
                                type="number"
                                id="id"
                                name="id"
                                value={deviceData.id}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                        {/* Campo para seleccionar el tipo de dispositivo */}
                        <div>
                            <label htmlFor="type">Tipo:</label>
                            <select
                                id="type"
                                name="type"
                                value={deviceData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="fotocopiadora">Fotocopiadora</option>
                                <option value="impresora">Impresora</option>
                                <option value="multifuncional">Multifuncional</option>
                            </select>
                        </div>
                        {/* Campo para ingresar el modelo del dispositivo */}
                        <div>
                            <label htmlFor="model">Modelo:</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={deviceData.model}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        {/* Campo para ingresar el número de modelo del dispositivo */}
                        <div>
                            <label htmlFor="modelnumber">Número de modelo:</label>
                            <input
                                type="text"
                                id="modelnumber"
                                name="modelnumber"
                                value={deviceData.modelnumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Campo para seleccionar el estado del dispositivo */}
                        <div>
                            <label htmlFor="status">Estado:</label>
                            <select
                                id="status"
                                name="status"
                                value={deviceData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="funcional">Funcional</option>
                                <option value="defectuosa">Defectuosa</option>
                                <option value="reparacion">Reparación</option>
                            </select>
                        </div>
                        {/* Botón para enviar el formulario */}
                        <button type="submit">Crear</button>
                    </form>
                    {/* Mensaje de carga si el estado de carga es verdadero */}
                    {loading && <p>Cargando...</p>}
                    {/* Mensaje de error si hay un error */}
                    {error && <p>Error: {error.message}</p>}
                </div>
            </div>
        </main>
    );
};

// Exportamos el componente CreateDevice como predeterminado
export default CreateDevice;
