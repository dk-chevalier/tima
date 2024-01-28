import { useRouteLoaderData } from 'react-router-dom';
import ListItem from '../../ui/ListItem';
import Spinner from '../../ui/Spinner';
import { useVenues } from './useVenues';

function VenuesList() {
  // const { venues, isLoading } = useVenues();
  const { venues, url } = useRouteLoaderData('venues');
  // console.log(venues);

  // return <div>VENUES</div>;
  return (
    <>
      {venues.data.map((venue) => (
        <ListItem
          type="venue"
          name={venue.venueName}
          contactName={venue.bookingContact.bookerName}
          contactEmail={venue.bookingContact.bookerEmail}
          city={venue.address.city}
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
