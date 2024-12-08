import React, { useEffect, useReducer } from 'react';
import ParkingLotState from './ParkingLotState';
import { fetchParkingLotState } from '../api/ParkingAPI';
import '../css/ParkingLot.css';

const initialParkingLotState = {
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

const parkingLotReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARKING_LOT_STATE':
            return { ...state, parkingLotList: action.payload };
        default:
            return state;
    }
};

export const ParkingLotContext = React.createContext();

const ParkingLot = () => {
    const [state, dispatch] = useReducer(parkingLotReducer, initialParkingLotState);

    useEffect(() => {
        fetchParkingLotState().then((data) => {
            dispatch({ type: 'SET_PARKING_LOT_STATE', payload: data });
        });
    }, []);

    return (
        <ParkingLotContext.Provider value={{ state, dispatch }}>
            <div className="parking-lot">
                {state.parkingLotList.map((parkingLotState) => (
                    <ParkingLotState key={parkingLotState.parkingLotId} parkingLotState={parkingLotState} />
                ))}
            </div>
        </ParkingLotContext.Provider>
    );
};

export default ParkingLot;