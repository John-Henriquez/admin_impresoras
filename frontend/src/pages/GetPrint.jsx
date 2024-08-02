import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { getPrint } from '../services/print.service';

const GetPrint = () => {
    const [identifier, setIdentifier] = useState(''); // estado para almacenar el RUT o ID del usuario
    const [printData, setPrintData] = useState(null); // estado para almacenar los datos de la impresión
    const [error, setError] = useState(null); // estado para almacenar cualquier error
    const [loading, setLoading] = useState(false); // estado para manejar la carga

    const fetchPrint = async () => {
        setLoading(true);
        try {
            const data = await getPrint(identifier); // llama a la función getPrint del servicio
            if (Array.isArray(data.data)) {
                setPrintData(data.data);
            } else if (Array.isArray(data)) {
                setPrintData(data);
            } else {
                console.error('Unexpected response format:', data);
                throw new Error('Unexpected response format');
            }
            setError(null);
        } catch (error) {
            setError(error);
            console.error('Error fetching print:', error);
            setPrintData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPrint();
    };

    return (
        <main className="prints_page">
            <Navbar />
            <div className="sections">
                <h1>Buscar Impresión</h1>
                <form onSubmit={handleSearch}>
                    <div>
                        <label>
                            RUT de usuario o ID de impresión:
                            <input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)} // actualiza el estado identifier
                            />
                        </label>
                    </div>
                    <button type="submit">Buscar</button> {/* botón para iniciar la búsqueda */}
                </form>
                {loading && <h2>Cargando...</h2>}
                {error && <div style={{ color: 'red' }}>{error.message}</div>} {/* muestra el error si existe */}
                {printData && printData.length > 0 && (
                    <div>
                        <h3>Datos de la Impresión</h3>
                        <div className="print-list">
                            {printData.map(print => (
                                <div key={print.id} className="print-item">
                                    <p>ID: {print.id}</p>
                                    <p>RUT del usuario: {print.userRut}</p>
                                    <p>Nombre del documento: {print.documentName}</p>
                                    <p>Páginas: {print.pages}</p>
                                    <p>Estado: {print.status}</p>
                                    <p>Creado en: {new Date(print.createdAt).toLocaleString()}</p>
                                    <p>Actualizado en: {new Date(print.updatedAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {printData && printData.length === 0 && <p>No se encontraron impresiones.</p>}
            </div>
        </main>
    );
};

export default GetPrint;
