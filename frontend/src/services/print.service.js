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
