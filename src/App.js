import './App.css';
import ParkingLot from './component/ParkingLot';
import ParkingLotManager from './component/ParkingManager'; // Corrected import
import React, { useReducer } from 'react';
import { initialParkingLotState, parkingLotReducer } from './parkingLotReducer';

export const ParkingLotContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(parkingLotReducer, initialParkingLotState);

  return (
    <div className="App">
      <ParkingLotContext.Provider value={{ state, dispatch }}>
        <ParkingLotManager />
        <ParkingLot />
      </ParkingLotContext.Provider>
    </div>
  );
}

export default App;