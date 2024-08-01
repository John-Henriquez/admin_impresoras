import axios from './root.service.js';

export async function getSupplies() {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get('/supplies', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function createSupplies(suppliesData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.post('/supplies', suppliesData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function updateSupply(id, updatedData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.put(`/supplies/${id}`, updatedData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function deleteSupplies(id) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.delete(`/supplies/${id}`, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

