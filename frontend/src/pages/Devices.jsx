import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Table from '../components/TableDevices';
import { getDevices, deleteDevice } from '../services/device.service';
import searchIcon from '../assets/searchIcon.svg';

// TABLA TIPO CRUD
const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const columns = ['ID', 'Tipo', 'Modelo', 'Número de modelo', 'Estado', 'Acción'];

    // Función para obtener y formatear los datos de los dispositivos
    const dataDevice = async () => {
        try {
            const response = await getDevices();
            const formattedData = response.data.map(device => ({
                ID: device.id,
                Tipo: device.type,
                Modelo: device.model,
                'Número de modelo': device.modelnumber,
                Estado: device.status
            }));
            setDevices(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Maneja la creación de un nuevo dispositivo
    const handleCreate = () => {
        navigate('/devices/new');
    };

    // Maneja la eliminación de un dispositivo
    const handleDelete = async (id) => {
        try {
            await deleteDevice(id);
            setDevices(devices.filter(device => device.ID !== id));
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Maneja la edición de un dispositivo
    const handleEdit = () => {
        navigate('/devices/edit/');
    };

    // Maneja la búsqueda de dispositivos
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Obtiene los datos de los dispositivos cuando el componente se monta
    useEffect(() => {
        dataDevice();
    }, []);

    // Filtra los dispositivos según el término de búsqueda
    const filteredDevices = devices.filter(device =>
        device.ID.toString().includes(searchTerm) ||
        device.Tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className='main-container'>
                <div className='search-container'>
                    <div className='search-bar'>
                        <img src={searchIcon} alt="Buscar" style={{ width: '20px', height: '20px', transform: 'translate(10px, 32px)' }} />
                        <input
                            type="text"
                            placeholder="Buscar por ID o Tipo"
                            value={searchTerm}
                            onChange={handleSearch}
                            className='search-input'
                        />
                    </div>
                </div>
                <div className='create-container'>
                    <button className='create-button' onClick={handleCreate}>Añadir dispositivo</button>
                    <button className='edit-button' onClick={handleEdit} style={{ marginLeft: '4px' }}>Editar dispositivo</button>
                </div>
                <Table columns={columns} data={filteredDevices} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        </>
    );
};

export default Devices;
