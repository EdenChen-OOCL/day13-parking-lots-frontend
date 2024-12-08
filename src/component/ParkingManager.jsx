import React, {useState, useContext} from 'react';
import {parkCar, fetchCar} from '../api/ParkingAPI';
import {Button, Input, Select} from 'antd';
import '../css/ParkingLotManager.css';
import {ParkingLotContext} from "../App";

const {Option} = Select;

const ParkingLotManager = () => {
    const {dispatch} = useContext(ParkingLotContext);
    const [plateNumber, setPlateNumber] = useState('');
    const [parkingType, setParkingType] = useState('FIRST_PARKING_LOT');

    const changePlateNumber = (event) => {
        setPlateNumber(event.target.value);
    };

    const changeParkingType = (value) => {
        setParkingType(value);
    };

    const handleParkCar = async () => {
        const response = await parkCar(plateNumber, parkingType);
        dispatch({type: 'PARK_CAR', payload: response});
    };

    const handleFetchCar = async () => {
        const ticket = {plateNumber, position: null, parkingLot: null};
        const response = await fetchCar(ticket);
        dispatch({type: 'FETCH_CAR', payload: response});
    };

    return (
        <div className="parking-lot-manager">
            <div>Plate Number:  </div>
            <Input
                placeholder='Like: "AB-1234"'
                value={plateNumber}
                onChange={changePlateNumber}
                style={{width: 200, marginRight: 10}}
            />
            <Select
                defaultValue="FIRST_PARKING_LOT"
                onChange={changeParkingType}
                style={{width: 200, marginRight: 10}}
            >
                <Option value="FIRST_PARKING_LOT">Standard</Option>
                <Option value="SMART_PARKING_LOT">Smart</Option>
                <Option
                    value="MAX_AVAILABLE_RATE_PARKING_LOT">SuperSmart</Option>
            </Select>
            <Button type="primary" onClick={handleParkCar}
                    style={{marginRight: 10}}>
                Park
            </Button>
            <Button type="primary" onClick={handleFetchCar}>
                Fetch
            </Button>
        </div>
    );
};

export default ParkingLotManager;