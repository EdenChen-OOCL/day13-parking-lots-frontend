import React from 'react';
import PropTypes from 'prop-types';
import '../css/Car.css';

const Car = ({ plateNumber }) => {
    return (
        <div className="car">
            {plateNumber}
        </div>
    );
};

Car.propTypes = {
    plateNumber: PropTypes.string.isRequired,
};

export default Car;