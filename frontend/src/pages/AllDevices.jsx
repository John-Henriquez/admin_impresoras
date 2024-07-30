import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { getDevices } from '../services/device.service';

const AllDevices = () => {
    const [devices, setDevices] = useState([]); // Inicializar como array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDevices = async () => {
        try {
            const data = await getDevices();
            console.log('Data:', data); // Log para verificar toda la respuesta
            if (Array.isArray(data)) {
                setDevices(data);
            } else if (data && Array.isArray(data.data)) {
                setDevices(data.data);
            } else {
                console.error('Unexpected response format:', data);
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching devices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    if (loading) {
        return (
            <main className="devices_page">
                <Navbar />
                <div className="sections">
                    <h1>Cargando...</h1>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="devices_page">
                <Navbar />
                <div className="sections">
                    <h1>Error</h1>
                    <p>{error.message}</p>
                </div>
            </main>
        );
    }

    if (devices.length === 0) {
        return (
            <main className="devices_page">
                <Navbar />
                <div className="sections">
                    <h1>All Devices</h1>
                    <p>No hay registros de dispositivos.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="devices_page">
            <Navbar />
            <div className="sections">
                <h1>All Devices</h1>
                <div className="device-list">
                    {devices.map(device => (
                        <div key={device.id} className="device-item">
                            <p>ID: {device.id}</p>
                            <p>Tipo: {device.type}</p>
                            <p>Modelo: {device.model}</p>
                            <p>Número de modelo: {device.modelnumber}</p>
                            <p>Estado: {device.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AllDevices;
