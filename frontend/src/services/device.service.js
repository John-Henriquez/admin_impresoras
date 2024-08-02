import axios from './root.service.js';

// Obtiene todos los dispositivos
export async function getDevices() {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get('/device', config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Obtiene un dispositivo por su id
export async function getDeviceById(id) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get(`/device/1?id=${id}`, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

// Obtiene un dispositivo por su type
export async function getDeviceByType(type) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.get(`/device/1?type=${type}`, config);
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
        const { data } = await axios.post('/device', deviceData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function updateDevice(id, deviceData) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.put(`/device/?id=${id}`, deviceData, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function deleteDevice(id) {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        };
        const { data } = await axios.delete(`/device/?id=${id}`, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
