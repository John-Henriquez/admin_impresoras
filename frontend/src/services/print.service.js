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
        
        const { data } = await axios.get('/prints/1', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Función para actualizar una impresión
export async function updatePrint(identifier, updatedData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            },
            params: {
                id: identifier
            }
        };
        const { data } = await axios.put(`/prints/${identifier}`, updatedData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// funcion para eliminar una impresion
export async function deletePrint(identifier) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            },
            params: {
                id: identifier // Esto está más para una eventual corrección en el backend.
            }
        };
        // Realizamos la solicitud de eliminación a la ruta fija
        const { data } = await axios.delete('/prints/1', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}