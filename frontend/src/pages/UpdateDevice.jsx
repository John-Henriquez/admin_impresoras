import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { updateDevice, getDeviceById } from '../services/device.service';

const UpdateDevice = () => {
    const [device, setDevice] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [model, setModel] = useState('');
    const [modelnumber, setModelnumber] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (device) {
            setType(device.type || '');
            setModel(device.model || '');
            setModelnumber(device.modelnumber || '');
            setStatus(device.status || '');
        }
    }, [device]);

    const fetchDevice = async (event) => {
        event.preventDefault();
        setError(null); // Limpia el error antes de realizar la búsqueda
        setDevice(null); // Limpia el dispositivo antes de realizar la búsqueda
        setLoading(true);
        try {
            if (id) {
                const response = await getDeviceById(id);
                console.log('Response:', response);
                const { data } = response;
                if (Array.isArray(data) && data.length > 0) {
                    setDevice(data[0]);
                } else {
                    setError(new Error('Dispositivo no encontrado.'));
                }
            } else {
                setError(new Error('No se proporcionó un ID.'));
            }
        } catch (error) {
            setError(error);
            console.error('Error fetching device:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setError(null); // Limpia el error antes de intentar actualizar
        setLoading(true);
        try {
            await updateDevice(id, { type, model, modelnumber, status });
            alert('Dispositivo actualizado con éxito.');
            navigate('/devices');
        } catch (error) {
            setError(error);
            console.error('Error updating device:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleIdChange = (event) => setId(event.target.value);
    const handleTypeChange = (event) => setType(event.target.value);
    const handleModelChange = (event) => setModel(event.target.value);
    const handleModelnumberChange = (event) => setModelnumber(event.target.value);
    const handleStatusChange = (event) => setStatus(event.target.value);

    return (
        <main className="main-container">
            <div className="device-table">
                <Navbar />
                <div className="sections">
                    <h1>Editar dispositivo</h1>
                    <form onSubmit={fetchDevice}>
                        <div>
                            <label htmlFor="id">ID:</label>
                            <input
                                type="number"
                                id="id"
                                name="id"
                                value={id}
                                onChange={handleIdChange}
                                min="1"
                            />
                        </div>
                        <button type="submit" style={{marginBottom: '10px'}}>Buscar</button>
                    </form>
                    {loading && <p>Cargando...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {device && (
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label htmlFor="type">Tipo:</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={type}
                                    onChange={handleTypeChange}
                                    required
                                >
                                    <option value="fotocopiadora">Fotocopiadora</option>
                                    <option value="impresora">Impresora</option>
                                    <option value="multifuncional">Multifuncional</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="model">Modelo:</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    value={model}
                                    onChange={handleModelChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="modelnumber">Número de modelo:</label>
                                <input
                                    type="text"
                                    id="modelnumber"
                                    name="modelnumber"
                                    value={modelnumber}
                                    onChange={handleModelnumberChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="status">Estado:</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                    required
                                >
                                    <option value="funcional">Funcional</option>
                                    <option value="reparacion">Reparación</option>
                                    <option value="defectuosa">Defectuosa</option>
                                </select>
                            </div>
                            <button type="submit">Actualizar</button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}

export default UpdateDevice;
