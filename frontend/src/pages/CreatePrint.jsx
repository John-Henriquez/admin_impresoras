import React, { useState } from 'react'; // Importa React y el hook useState para manejar estados
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar a diferentes rutas
import Navbar from "../components/Navbar"; // Importa el componente Navbar
import { createPrint } from '../services/print.service'; // Importa la función createPrint del servicio print

const CreatePrint = () => {
    // Define el estado printData para almacenar los datos del formulario de impresión
    const [printData, setPrintData] = useState({
        id: '', // Campo para el identificador de impresión
        userRut: '', // Campo para el RUT del usuario
        documentName: '', // Campo para el nombre del documento
        pages: '', // Campo para el número de páginas
        status: 'pendiente', // Estado inicial de la impresión
    });

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Función para manejar cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestructura el nombre y el valor del input
        // Actualiza el estado con el nuevo valor del input correspondiente
        setPrintData({
            ...printData, // Copia los datos actuales del estado
            [name]: value, // Actualiza el campo específico con el nuevo valor
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            // Llama a la función createPrint para crear una nueva impresión
            await createPrint(printData);
            // Navega a la página de impresiones después de crear la impresión
            navigate('/prints');
        } catch (error) {
            // Muestra un error en la consola si falla la creación
            console.error('Error creating print:', error);
        }
    };

    return (
        <main className="print-create-page">
            <Navbar /> {/* Renderiza el componente Navbar */}
            <div className="print-sections">
                <h1>Crear una nueva impresión</h1>
                <form className="print-form" onSubmit={handleSubmit}> {/* Maneja el envío del formulario */}
                    <div>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={printData.id} // Valor del input asociado al estado
                            onChange={handleChange} // Maneja cambios en el input
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
                            <option value="pendiente">Pendiente</option> {/* Opción pendiente */}
                            <option value="completado">Completado</option> {/* Opción completado */}
                            <option value="cancelado">Cancelado</option> {/* Opción cancelado */}
                        </select>
                    </div>
                    <button type="submit">Crear</button> {/* Botón para enviar el formulario */}
                </form>
            </div>
        </main>
    );
    
    
};

export default CreatePrint; // Exporta el componente CreatePrint
