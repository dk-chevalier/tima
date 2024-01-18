import { Outlet } from 'react-router-dom';
import RadioStationsList from '../features/radio/shows/RadioStationsList';

function RadioResults() {
  return (
    <>
      <RadioStationsList />
      <Outlet />
    </>
  );
}

export default RadioResults;
