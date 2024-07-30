import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { createSupplies } from '../services/supplies.service';

const CreateSupplies = () => {
    const [suppliesData, setSuppliesData] = useState({
        _id: '',
        nombre: '',
        cantidad: '',
        status: 'available',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuppliesData({
            ...suppliesData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSupplies(suppliesData);
            navigate('/supplies');
        } catch (error) {
            setError(error);
            console.error('Error creating supplies:', error);
        }
    };

    return (
        <main className="create_supplies_page">
            <Navbar />
            <div className="sections">
                <h1>Crear un nuevo suministro</h1>
                {error && (
                    <div className="error">
                        <p>{error.message}</p>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            name="_id"
                            value={suppliesData._id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={suppliesData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input
                            type="number"
                            name="cantidad"
                            value={suppliesData.cantidad}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado</label>
                        <select
                            name="status"
                            value={suppliesData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="available">Disponible</option>
                            <option value="unavailable">No Disponible</option>
                        </select>
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </div>
        </main>
    );
};

export default CreateSupplies;
