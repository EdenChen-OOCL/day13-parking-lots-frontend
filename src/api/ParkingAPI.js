import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status !== 200) {
            return Promise.reject(error);
        }
    }
);

export const fetchParkingLotState = async () => {
    const response = await axiosInstance.get('/parking-lot/status');
    return response.data;
};

export const parkCar = async (plateNumber, parkingType) => {
    const response = await axiosInstance.post(`/parking-car?parkingStrategyEnum=${parkingType? parkingType: 'FIRST_PARKING_LOT'}`, {
        plateNumber,
    });
    return response.data;
};

export const fetchCar = async (ticket) => {
    const response = await axiosInstance.delete('/parking-car', {
        data: ticket,
    });
    return response.data;
};