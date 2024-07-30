import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { getPrints } from '../services/print.service';

const AllPrints = () => {
    const [prints, setPrints] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPrints = async () => {
        try {
            const data = await getPrints();
            console.log('Data:', data); // Log para verificar toda la respuesta
            if (Array.isArray(data.data)) {
                setPrints(data.data);
            } else if (Array.isArray(data)) {
                setPrints(data);
            } else {
                console.error('Unexpected response format:', data);
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching prints:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrints();
    }, []);

    if (loading) {
        return (
            <main className="prints_page">
                <Navbar />
                <div className="sections">
                    <h1>Cargando...</h1>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="prints_page">
                <Navbar />
                <div className="sections">
                    <h1>Error</h1>
                    <p>{error.message}</p>
                </div>
            </main>
        );
    }

    if (prints.length === 0) {
        return (
            <main className="prints_page">
                <Navbar />
                <div className="sections">
                    <h1>All Prints</h1>
                    <p>No hay registros de impresiones.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="prints_page">
            <Navbar />
            <div className="sections">
                <h1>All Prints</h1>
                <div className="print-list">
                    {prints.map(print => (
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
        </main>
    );
};

export default AllPrints;