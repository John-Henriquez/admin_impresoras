import { useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateSupply } from "../services/supplies.service.js";

const EditSupply = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { supply } = location.state;

    const modSupply = (data) => {
        updateSupply(supply._id, data)
            .then(response => {
                console.log("Supply updated successfully:", response);
                navigate('/supplies/all');
            })
            .catch(error => {
                console.error("Error updating supply:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar suministro"
                        fields={[
                            {
                                label: "Nombre del suministro",
                                name: "nombre",
                                placeholder: supply.nombre || "Nombre del suministro",
                                type: "text",
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",
                                placeholder: supply.cantidad || "Cantidad",
                                type: "number",
                            },
                            {
                                label: "Estado",
                                name: "status",
                                type: "select",
                                options: [
                                    {value: "disponible", label: "Disponible" },
                                    {value: "no disponible", label: "No disponible" },

                                ],
                                value: supply.status || "no disponible"
                            },
                        ]}
                        buttonText="Guardar cambios"
                        onSubmit={modSupply}
                    />
                </div>
            </div>
        </>
    );
};

export default EditSupply;
