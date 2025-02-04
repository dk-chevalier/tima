import { useRouteLoaderData } from 'react-router-dom';
import ListItem from '../../ui/ListItem';
import Spinner from '../../ui/Spinner';
import { useVenues } from './useVenues';

function VenuesList() {
  // const { venues, isLoading } = useVenues();
  const { venues, url } = useRouteLoaderData('venues');

  if (!venues) return;
  return (
    <>
      {venues.data.map((venue) => (
        <ListItem
          type="venue"
          name={venue.venueName}
          contactName={
            venue.bookingContact?.bookerName
              ? venue.bookingContact.bookerName
              : ''
          }
          contactEmail={
            venue.bookingContact?.bookerEmail
              ? venue.bookingContact.bookerEmail
              : venue.venueEmail
          }
          city={venue.address?.city ? venue.address.city : ''}
          key={venue.id}
          id={venue.id}
          website={venue.website}
          query={url.search}
        />
      ))}
    </>
  );
}

export default VenuesList;
