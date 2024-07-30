import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { createPrint } from '../services/print.service';

const CreatePrint = () => {
    const [printData, setPrintData] = useState({
        id: '', // Reintegrar el campo id
        userRut: '',
        documentName: '',
        pages: '',
        status: 'pendiente',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrintData({
            ...printData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPrint(printData);
            navigate('/prints');
        } catch (error) {
            console.error('Error creating print:', error);
        }
    };

    return (
        <main className="create_print_page">
            <Navbar />
            <div className="sections">
                <h1>Crear una nueva impresión</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={printData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>RUT del usuario</label>
                        <input
                            type="text"
                            name="userRut"
                            value={printData.userRut}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nombre del documento</label>
                        <input
                            type="text"
                            name="documentName"
                            value={printData.documentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Páginas</label>
                        <input
                            type="number"
                            name="pages"
                            value={printData.pages}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado</label>
                        <select
                            name="status"
                            value={printData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="completado">Completado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </div>
        </main>
    );
};

export default CreatePrint;
