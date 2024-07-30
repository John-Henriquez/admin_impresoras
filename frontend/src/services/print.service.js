import axios from './root.service.js';

export async function createPrint(printData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.post('/prints', printData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function getPrints() {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get('/prints', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Función para obtener impresiones por RUT o ID
export async function getPrint(identifier) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            },
            params: {
                userRut: identifier,
                id: identifier
            }
        };
        // Usar la ruta '/api/prints/1' ya que no podemos cambiar el backend
        const { data } = await axios.get('/api/prints/1', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Función para actualizar una impresión
export async function updatePrint(id, updatedData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.put(`/api/prints/${id}`, updatedData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Función para eliminar una impresión
export async function deletePrint(id) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.delete(`/api/prints/${id}`, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
