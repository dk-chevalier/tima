import { useVenues } from '../features/venues/useVenues';
import Button from './Button';
import ListItem from './ListItem';
import Spinner from './Spinner';

function Sidebar() {
  // TEMPORARY
  const type = 'venue';
  const { venues, isLoading } = useVenues();

  // FIXME: should have content of sidebar in different component...thus allowing for the sidebar to always be there/look same and the content to merely change depending of if loading etc.
  if (isLoading)
    return (
      <aside className="col-span-1 bg-secondary-100">
        <Spinner />
      </aside>
    );

  return (
    <aside className="col-span-1 bg-secondary-100">
      <Button>Search</Button>
      <ul className="flex flex-col gap-4 overflow-scroll px-2 py-3">
        {type === 'venue' &&
          venues.data.map((venue) => (
            <ListItem
              type={type}
              name={venue.venueName}
              contactName={venue.bookingContact.bookerName}
              contactEmail={venue.bookingContact.bookerEmail}
              city={venue.address.city}
              key={venue.venueName}
            />
          ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
