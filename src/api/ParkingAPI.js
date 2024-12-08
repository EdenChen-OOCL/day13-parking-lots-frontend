import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            let errorMessage = 'An error occurred';

            switch (status) {
                case 400:
                    if (data.exception === 'NoAvailablePositionException') {
                        errorMessage = data.body || 'No available position';
                    } else if (data.exception === 'UnrecognizedTicketException') {
                        errorMessage = data.body || 'Unrecognized ticket';
                    } else if (data.exception === 'InvalidLicensePlateException') {
                        errorMessage = data.body || 'Invalid license plate';
                    } else {
                        errorMessage = data.body || 'Bad request';
                    }
                    break;
                default:
                    errorMessage = data.body || 'An unexpected error occurred';
            }

            alert(errorMessage);
        } else {
            alert('Network error');
        }

        return Promise.reject(error);
    }
);

export const fetchParkingLotState = async () => {
    try {
        const response = await axiosInstance.get('/parking-lot/status');
        return response.data;
    } catch (e) {
        return null;
    }
};

export const parkCar = async (plateNumber, parkingType) => {
    try {
        const response = await axiosInstance.post(
            `/parking-car?parkingStrategyEnum=${parkingType ? parkingType
                : 'FIRST_PARKING_LOT'}`, {
                plateNumber,
            });
        return response.data;
    } catch (e) {
        return null;
    }
};

export const fetchCar = async (ticket) => {
    try {
        const response = await axiosInstance.delete('/parking-car', {
            data: ticket,
        });
        return response.data;
    } catch (e) {
        return null;
    }
};