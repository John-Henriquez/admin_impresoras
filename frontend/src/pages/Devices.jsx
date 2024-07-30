import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Devices = () => {
    const navigate = useNavigate();

    return (
        <main className="devices_page">
            <Navbar />
            <div className="sections">
                <h1>Devices</h1>
                <div className="button-row">
                    <button onClick={() => navigate('/devices/new')}>Crear un nuevo dispositivo</button>
                    <button onClick={() => navigate('/devices/all')}>Ver todos los dispositivos</button>
                </div>
            </div>
        </main>
    );
};

export default Devices;
