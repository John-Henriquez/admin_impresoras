// src/pages/Prints.jsx
import React from 'react'; // Importa React para crear el componente
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar a diferentes rutas
import Navbar from "../components/Navbar"; // Importa el componente Navbar

const Prints = () => {
    const navigate = useNavigate(); // Hook para navegar entre rutas

    return (
        <main className="prints-menu-page">
            <Navbar /> {/* Renderiza el componente Navbar */}
            <div className="prints-menu-sections">
                <div className="prints-menu-container">
                    <h1>Prints</h1>
                    <form className="prints-menu-form">
                        <button className="prints-menu-buttons" onClick={() => navigate('/prints/new')}>crear una nueva impresion</button>
                        <button className="prints-menu-buttons" onClick={() => navigate('/prints/all')}>ver todas las impresiones</button>
                        <button className="prints-menu-buttons" onClick={() => navigate('/print/search')}>buscar impresion por rut</button>
                        <button className="prints-menu-buttons" onClick={() => navigate('/print/update')}>actualizar impresion</button>
                        <button className="prints-menu-buttons" onClick={() => navigate('/print/delete')}>eliminar impresion</button> 
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Prints; // Exporta el componente Prints
