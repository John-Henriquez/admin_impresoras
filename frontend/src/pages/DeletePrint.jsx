// src/pages/DeletePrint.jsx
import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import Navbar from "../components/Navbar"; // Importa el componente Navbar
import { getPrints, deletePrint } from '../services/print.service'; // Importa funciones para obtener y eliminar impresiones

const DeletePrint = () => {
    // Define el estado para almacenar impresiones, errores y el estado de carga
    const [prints, setPrints] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función asíncrona para obtener impresiones desde el servicio
    const fetchPrints = async () => {
        try {
            const data = await getPrints(); // Llama al servicio para obtener las impresiones
            console.log('Data:', data); // Log para verificar toda la respuesta
            // Verifica si la respuesta es un array de impresiones
            if (Array.isArray(data.data)) {
                setPrints(data.data); // Actualiza el estado con los datos de impresiones
            } else if (Array.isArray(data)) {
                setPrints(data);
            } else {
                console.error('Unexpected response format:', data); // Log para formatos inesperados
                throw new Error('Unexpected response format'); // Lanza un error si el formato es inesperado
            }
        } catch (error) {
            setError(error); // Actualiza el estado de error si ocurre uno
            console.error('Error fetching prints:', error);
        } finally {
            setLoading(false); // Detiene el estado de carga una vez que se completa la solicitud
        }
    };

    // Función para manejar la eliminación de una impresión por su id
    const handleDelete = async (id) => {
        try {
            await deletePrint(id); // Llama al servicio para eliminar la impresión
            // Filtra la impresión eliminada de la lista de impresiones
            setPrints(prints.filter(print => print.id !== id));
        } catch (error) {
            console.error('Error deleting print:', error);
            setError(error); // Actualiza el estado de error si ocurre uno
        }
    };

    // useEffect para cargar las impresiones cuando el componente se monta
    useEffect(() => {
        fetchPrints(); // Llama a fetchPrints al montar el componente
    }, []); // El array vacío indica que el efecto se ejecuta solo una vez al montar

    // Renderiza una pantalla de carga mientras se obtienen los datos
    if (loading) {
        return (
            <main className="prints_page">
                <Navbar /> {/* Renderiza el componente Navbar */}
                <div className="sections">
                    <h1>Cargando...</h1>
                </div>
            </main>
        );
    }

    // Renderiza un mensaje de error si ocurre uno
    if (error) {
        return (
            <main className="prints_page">
                <Navbar />
                <div className="sections">
                    <h1>Error</h1>
                    <p>{error.message}</p> {/* Muestra el mensaje de error */}
                </div>
            </main>
        );
    }

    // Renderiza un mensaje si no hay impresiones para mostrar
    if (prints.length === 0) {
        return (
            <main className="prints_page">
                <Navbar />
                <div className="sections">
                    <h1>Eliminar Impresiones</h1>
                    <p>No hay registros de impresiones.</p>
                </div>
            </main>
        );
    }

    // Renderiza la lista de impresiones con la opción de eliminarlas
    return (
        <main className="prints_page">
            <Navbar />
            <div className="prints-menu-sections">
                <h1>Eliminar Impresiones</h1>
                <div className="print-list">
                    {prints.map(print => ( // Mapea cada impresión para crear un elemento de lista
                        <div key={print.id} className="print-item">
                            <p>ID: {print.id}</p>
                            <p>RUT del usuario: {print.userRut}</p>
                            <p>Nombre del documento: {print.documentName}</p>
                            <p>Páginas: {print.pages}</p>
                            <p>Estado: {print.status}</p>
                            <p>Creado en: {new Date(print.createdAt).toLocaleString()}</p>
                            <p>Actualizado en: {new Date(print.updatedAt).toLocaleString()}</p>
                            <button onClick={() => handleDelete(print.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default DeletePrint; // Exporta el componente DeletePrint
