import axios from './root.service.js';

export async function getDevices() {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get('/device', config); // Asegúrate de que la ruta sea `/device`
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}


export async function createDevice(deviceData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.post('/device', deviceData, config); // La ruta es /device
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}