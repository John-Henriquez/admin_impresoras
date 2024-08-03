import React, { useState } from 'react'; // Importa React y el hook useState para manejar estados
import Navbar from "../components/Navbar"; // Importa el componente Navbar
import { getPrint } from '../services/print.service'; // Importa la función getPrint del servicio print

const GetPrint = () => {
    // Define el estado para almacenar el identificador (RUT o ID del usuario)
    const [identifier, setIdentifier] = useState('');
    // Define el estado para almacenar los datos de la impresión
    const [printData, setPrintData] = useState(null);
    // Define el estado para almacenar cualquier error que ocurra
    const [error, setError] = useState(null);
    // Define el estado para manejar la carga
    const [loading, setLoading] = useState(false);

    // Función asíncrona para obtener una impresión desde el servicio
    const fetchPrint = async () => {
        setLoading(true); // Inicia el estado de carga
        try {
            const data = await getPrint(identifier); // Llama a la función getPrint del servicio con el identificador
            // Verifica si la respuesta es un array de impresiones
            if (Array.isArray(data.data)) {
                setPrintData(data.data); // Actualiza el estado con los datos de la impresión
            } else if (Array.isArray(data)) {
                setPrintData(data);
            } else {
                console.error('Unexpected response format:', data); // Log para formatos inesperados
                throw new Error('Unexpected response format'); // Lanza un error si el formato es inesperado
            }
            setError(null); // Resetea el estado de error si no hay errores
        } catch (error) {
            setError(error); // Actualiza el estado de error si ocurre uno
            console.error('Error fetching print:', error);
            setPrintData(null); // Resetea los datos de impresión en caso de error
        } finally {
            setLoading(false); // Detiene el estado de carga una vez que se completa la solicitud
        }
    };

    // Función para manejar la búsqueda de impresión
    const handleSearch = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        fetchPrint(); // Llama a fetchPrint para buscar la impresión
    };

    return (
        <main className="prints_page">
            <Navbar /> {/* Renderiza el componente Navbar */}
            <div className="print-sections">
                <h1>Buscar Impresión</h1>
                <form onSubmit={handleSearch}> {/* Maneja el envío del formulario */}
                    <div>
                        <label>
                            Ingrese Rut de impresión que desea buscar:
                            <input
                                type="text"
                                value={identifier} // Valor del input asociado al estado identifier
                                onChange={(e) => setIdentifier(e.target.value)} // Actualiza el estado identifier
                            />
                        </label>
                    </div>
                    <button type="submit">Buscar</button> {/* Botón para iniciar la búsqueda */}
                </form>
                {loading && <h2>Cargando...</h2>} {/* Muestra un mensaje de carga */}
                {error && <div style={{ color: 'red' }}>{error.message}</div>} {/* Muestra el error si existe */}
                {printData && printData.length > 0 && ( // Verifica si hay datos de impresión
                    <div>
                        <h3>Datos de la Impresión</h3>
                        <div className="print-list">
                            {printData.map(print => ( // Mapea cada impresión para crear un elemento de lista
                                <div key={print.id} className="print-item">
                                    <p>ID: {print.id}</p> {/* Muestra el ID de la impresión */}
                                    <p>RUT del usuario: {print.userRut}</p> {/* Muestra el RUT del usuario */}
                                    <p>Nombre del documento: {print.documentName}</p> {/* Muestra el nombre del documento */}
                                    <p>Páginas: {print.pages}</p> {/* Muestra el número de páginas */}
                                    <p>Estado: {print.status}</p> {/* Muestra el estado de la impresión */}
                                    <p>Creado en: {new Date(print.createdAt).toLocaleString()}</p> {/* Muestra la fecha de creación */}
                                    <p>Actualizado en: {new Date(print.updatedAt).toLocaleString()}</p> {/* Muestra la fecha de actualización */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {printData && printData.length === 0 && <p>No se encontraron impresiones.</p>} {/* Mensaje si no hay impresiones */}
            </div>
        </main>
    );
};

export default GetPrint; // Exporta el componente GetPrint
