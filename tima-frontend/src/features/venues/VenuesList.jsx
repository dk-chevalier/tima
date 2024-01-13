import ListItem from '../../ui/ListItem';
import Spinner from '../../ui/Spinner';
import { useVenues } from './useVenues';

function VenuesList() {
  const { venues, isLoading } = useVenues();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        venues.data.map((venue) => (
          <ListItem
            type="venue"
            name={venue.venueName}
            contactName={venue.bookingContact.bookerName}
            contactEmail={venue.bookingContact.bookerEmail}
            city={venue.address.city}
            key={venue.venueName}
          />
        ))
      )}
    </>
  );
}

export default VenuesList;
