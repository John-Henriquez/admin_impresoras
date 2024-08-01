// src/pages/Prints.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Prints = () => {
    const navigate = useNavigate();

    return (
        <main className="prints_page">
            <Navbar />
            <div className="sections">
                <h1>Prints</h1>
                <div className="button-row">
                    <button onClick={() => navigate('/prints/new')}>crear una nueva impresion</button>
                    <button onClick={() => navigate('/prints/all')}>ver todas las impresiones</button>
                    <button onClick={() => navigate('/prints/search')}>buscar impresion por rut o id</button>
                    <button onClick={() => navigate('/update-print')}>actualizar impresion</button>
                    <button onClick={() => navigate('/delete-print')}>eliminar impresion</button> 
                </div>
            </div>
        </main>
    );
};

export default Prints;
