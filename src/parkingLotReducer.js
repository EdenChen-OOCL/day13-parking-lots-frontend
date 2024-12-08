export const initialParkingLotState = {
    parkingLotList: [
        {
            "parkingLotId": 1,
            "parkingLotName": "Plaza Park",
            "capacity": 9,
            "position": [
                "",
                "AB-1234",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ]
        },
        {
            "parkingLotId": 2,
            "parkingLotName": "City Mall Garage",
            "capacity": 12,
            "position": [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ]
        },
        {
            "parkingLotId": 3,
            "parkingLotName": "Office Tower Parking",
            "capacity": 9,
            "position": [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "AB-9999"
            ]
        }
    ],
};

export const parkingLotReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARKING_LOT_STATE':
            return { ...state, parkingLotList: action.payload };
        case 'PARK_CAR':
            return {
                ...state,
                parkingLotList: state.parkingLotList.map((lot) =>
                    lot.parkingLotId === action.payload.parkingLot
                        ? {
                            ...lot,
                            position: lot.position.map((pos, index) =>
                                index === action.payload.position ? action.payload.plateNumber : pos
                            ),
                        }
                        : lot
                ),
            };
        case 'FETCH_CAR':
            return {
                ...state,
                parkingLotList: state.parkingLotList.map((lot) =>
                    lot.position.includes(action.payload.plateNumber)
                        ? {
                            ...lot,
                            position: lot.position.map((pos) =>
                                pos === action.payload.plateNumber ? '' : pos
                            ),
                        }
                        : lot
                ),
            };
        default:
            return state;
    }
};