import { Outlet } from 'react-router-dom';
import RadioStationsList from '../features/radio/stations/RadioStationsList';

function RadioResults() {
  return (
    <>
      <RadioStationsList />
      <Outlet />
    </>
  );
}

export default RadioResults;
