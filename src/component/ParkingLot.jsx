import React, {useContext, useEffect} from 'react';
import ParkingLotState from './ParkingLotState';
import {fetchParkingLotState} from '../api/ParkingAPI';
import '../css/ParkingLot.css';
import {
    ParkingLotContext,
} from "../App";

const ParkingLot = () => {
    const {state, dispatch} = useContext(ParkingLotContext);

    useEffect(() => {
        fetchParkingLotState().then((data) => {
            dispatch({type: 'SET_PARKING_LOT_STATE', payload: data});
        });
    }, [dispatch]);

    return (
        <div className="parking-lot">
            {state.parkingLotList.map((parkingLotState) => (
                <ParkingLotState key={parkingLotState.parkingLotId}
                                 parkingLotState={parkingLotState}/>
            ))}
        </div>
    );
};

export default ParkingLot;