import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TableSupplies from "../components/TableSupplies";
import { getSupplies, deleteSupplies } from "../services/supplies.service";

const AllSupplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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
  
  const handleEdit = (supply) => {
    navigate(`/edit-supply/${supply._id}`, { state: { supply } });
  };
  
  const handleDelete = async (supplies) => {
    try {
      await deleteSupplies(supplies._id);
      setSupplies((prevSupplies) => prevSupplies.filter((item) => item._id !== supplies._id));

    } catch (error) {
      console.error("Error deleting supply:", error);
    }
  }

  const columns = [
    { Header: "ID", accessor: "_id" },
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Cantidad", accessor: "cantidad" },
    { Header: "Estado", accessor: "estado"},
    { Header: "Acción", accessor: "Acción" }  
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

  if (supplies.length === 0) {
    return (
      <main className="supplies_page">
        <Navbar />
        <div className="sections">
          <br />
          <h1>Tabla inventario</h1>
          <p>No hay registros de suministros.</p>
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


  
  return (
    <main className="supplies_page">
      <Navbar />
      <div className="sections">
        <br />
        <h1>Tabla inventario</h1>
        <div className="table-container">
          <TableSupplies 
            columns={columns} 
            data={supplies} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        </div>
      </div>
    </main>
  );
};

export default AllSupplies;
