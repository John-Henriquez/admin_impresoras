import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Supplies = () => {
  const navigate = useNavigate();

  return (
    <main className="supplies_page">
      <Navbar />
      <div className="sections">
        <br />
        <br />
        <div className="button-row">
          <button onClick={() => navigate("/supplies/new")}>
            Crear un nuevo suministro
          </button>
          <button onClick={() => navigate("/supplies/all")}>
            Ver todos los suministros
          </button>
        </div>
      </div>
    </main>
  );
};

export default Supplies;
