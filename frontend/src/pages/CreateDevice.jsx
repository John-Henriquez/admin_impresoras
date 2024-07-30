import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { createDevice } from '../services/device.service';

const CreateDevice = () => {
    const [deviceData, setDeviceData] = useState({
        id: '', 
        type: 'fotocopiadora',
        model: '',
        modelnumber: '',
        status: 'funcional',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData({
            ...deviceData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDevice(deviceData);
            navigate('/devices');
        } catch (error) {
            console.error('Error creating device:', error);
        }
    };

    return (
        <main className="create_device_page">
            <Navbar />
            <div className="sections">
                <h1>Crear un nuevo dispositivo</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={deviceData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Tipo</label>
                        <select
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
                    <div>
                        <label>Modelo</label>
                        <input
                            type="text"
                            name="model"
                            value={deviceData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Número de modelo</label>
                        <input
                            type="text"
                            name="modelnumber"
                            value={deviceData.modelnumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado</label>
                        <select
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
                    <button type="submit">Crear</button>
                </form>
            </div>
        </main>
    );
};

export default CreateDevice;
