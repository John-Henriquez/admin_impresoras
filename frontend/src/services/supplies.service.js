import axios from './root.service.js';

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
