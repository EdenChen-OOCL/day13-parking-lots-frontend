import React from 'react';
import PropTypes from 'prop-types';
import Car from './Car';
import '../css/ParkingLotState.css';

const ParkingLotState = ({ parkingLotState }) => {
    const rows = [];
    for (let i = 0; i < parkingLotState.position.length; i += 3) {
        rows.push(parkingLotState.position.slice(i, i + 3));
    }

    return (
        <div className="parking-lot-state">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="parking-lot-row">
                    {row.map((plateNumber, index) => (
                        <Car key={index} plateNumber={plateNumber} />
                    ))}
                </div>
            ))}
            <div className="parking-lot-name">{parkingLotState.parkingLotName}</div>
        </div>
    );
};

ParkingLotState.propTypes = {
    parkingLotState: PropTypes.shape({
        parkingLotId: PropTypes.number.isRequired,
        parkingLotName: PropTypes.string.isRequired,
        position: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default ParkingLotState;