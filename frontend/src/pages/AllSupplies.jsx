import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { getSupplies } from '../services/supplies.service';

const AllSupplies = () => {
    const [supplies, setSupplies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSupplies = async () => {
        try {
            const data = await getSupplies();
            console.log('Data:', data); // Log para verificar toda la respuesta
            if (Array.isArray(data.data)) {
                setSupplies(data.data);
            } else if (Array.isArray(data)) {
                setSupplies(data);
            } else {
                console.error('Unexpected response format:', data);
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching supplies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    if (loading) {
        return (
            <main className="supplies_page">
                <Navbar />
                <div className="sections">
                    <h1>Cargando...</h1>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="supplies_page">
                <Navbar />
                <div className="sections">
                    <h1>Error</h1>
                    <p>{error.message}</p>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            </main>
        );
    }

    if (supplies.length === 0) {
        return (
            <main className="supplies_page">
                <Navbar />
                <div className="sections">
                    <h1>All Supplies</h1>
                    <p>No hay registros de suministros.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="supplies_page">
            <Navbar />
            <div className="sections">
                <h1>All Supplies</h1>
                <div className="supplies-list">
                    {supplies.map(supply => (
                        <div key={supply._id} className="supply-item">
                            <p>ID: {supply._id}</p>
                            <p>Nombre: {supply.nombre}</p>
                            <p>Cantidad: {supply.cantidad}</p>
                            <p>Estado: {supply.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AllSupplies;
