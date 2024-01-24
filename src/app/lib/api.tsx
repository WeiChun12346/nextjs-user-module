import axios from "axios";

const API_BASE_URL = 'http://localhost:3301';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'service-key': 'd16d5499-ae1d-45ea-82b1-c8b4d2376ba2',
    },
});

export default axiosInstance;