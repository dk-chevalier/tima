import { useRouteLoaderData } from 'react-router-dom';
import ListItem from '../../ui/ListItem';
import Spinner from '../../ui/Spinner';
import { useVenues } from './useVenues';

function VenuesList() {
  // const { venues, isLoading } = useVenues();
  const { data: venues } = useRouteLoaderData('venues');

  // return <div>VENUES</div>;
  return (
    <>
      {venues.map((venue) => (
        <ListItem
          type="venue"
          name={venue.venueName}
          contactName={venue.bookingContact.bookerName}
          contactEmail={venue.bookingContact.bookerEmail}
          city={venue.address.city}
          key={venue.id}
          id={venue.id}
          website={venue.website}
        />
      ))}
    </>
  );
}

export default VenuesList;
