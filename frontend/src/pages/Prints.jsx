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
                    <button onClick={() => navigate('/prints/new')}>Crear una nueva impresión</button>
                    <button onClick={() => navigate('/prints/all')}>Ver todas las impresiones</button>
                </div>
            </div>
        </main>
    );
};

export default Prints;
