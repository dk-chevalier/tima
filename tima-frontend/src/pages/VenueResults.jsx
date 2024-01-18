import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';

function VenueResults() {
  return (
    <>
      <VenuesList />
      <Outlet />
    </>
  );
}

export default VenueResults;
