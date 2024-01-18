import { useParams } from 'react-router-dom';
import { useVenue } from './useVenue';

function VenueInfo() {
  const { venueId } = useParams();
  const venue = useVenue(venueId);

  return <div>VENUE</div>;
}

export default VenueInfo;
