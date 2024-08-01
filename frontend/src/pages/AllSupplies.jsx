import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/TableSupplies";
import { getSupplies } from "../services/supplies.service";

const AllSupplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSupplies = async () => {
    try {
      const data = await getSupplies();
      console.log("Data:", data); // Log para verificar toda la respuesta
      if (Array.isArray(data.data)) {
        setSupplies(data.data);
      } else if (Array.isArray(data)) {
        setSupplies(data);
        console.error("Unexpected response format:", data);
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching supplies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Cantidad", accessor: "cantidad" },
    { Header: "Estado", accessor: "status" },
  ];
  
  if (loading) {
    return (
      <main className="supplies_page">
        <Navbar />
        <div className="sections">
          <h1>Cargando...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="supplies_page">
        <Navbar />
        <div className="sections">
          <h1>Error</h1>
          <p>{error.message}</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </main>
    );
  }

  if (supplies.length === 0) {
    return (
      <main className="supplies_page">
        <Navbar />
        <div className="sections">
          <br />
          <h1>Table inventario</h1>
          <p>No hay registros de suministros.</p>
        </div>
      </main>
    );
  }
  
  return (
    <main className="supplies_page">
      <Navbar />
      <div className="sections">
        <br />
        <h1>Tabla inventario</h1>
        <div className="table-container">
          <Table columns={columns} data={supplies} />
        </div>
      </div>
    </main>
  );
};

export default AllSupplies;
