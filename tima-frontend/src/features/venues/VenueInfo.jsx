import { useParams } from 'react-router-dom';
import { useVenue } from './useVenue';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';

function VenueInfo() {
  const { venueId } = useParams();
  const { venue, isLoading, error } = useVenue(venueId);

  if (isLoading) return <Spinner />;

  const {
    address,
    venueName,
    venuePh,
    venueEmail,
    website,
    bookingContact,
    ratingsAverage,
    ratingsQuantity,
    days,
    originals,
    soundSystemProvided,
    capacity,
    gigType,
  } = venue.data;

  console.log(venue);

  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col justify-center">
        <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
          {venueName}
        </h2>
        <a href={website} className="text-sm">
          {website}
        </a>
      </div>
      <div className="relative right-[-0.5rem] top-[-0.5rem] col-span-1 col-start-2 row-span-1 row-start-1 flex flex-col items-end text-right text-xs opacity-60">
        <div>
          <p>{ratingsAverage}/5 stars</p>
          <p>from {ratingsQuantity} ratings</p>
        </div>
        <p>{originals ? 'Supports originals' : 'Covers gig'}</p>
        <p>{soundSystemProvided ? 'PA provided' : 'BYO PA'}</p>
        <p>{capacity} capacity</p>
        <p>
          {gigType === 'both' ? 'Both ticketed & free-entry gigs' : gigType}
        </p>
      </div>
      <div className="col-span-1 col-start-1 row-span-1 row-start-2">
        <p>{address.street}</p>
        <p>
          <span>{address.city}</span>, <span>{address.state}</span>
        </p>
        <p>
          <span>{address.country}</span>, <span>{address.postcode}</span>
        </p>
      </div>
      <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex flex-col items-end">
        <h3 className="mb-1 text-sm text-primary-800">
          Venue contact details:
        </h3>
        <p>{venuePh}</p>
        <p>{venueEmail}</p>
      </div>
      <div className="col-span-2 col-start-1 row-span-1 row-start-3 rounded-sm border border-secondary-300 bg-primary-300 p-6 shadow-md">
        <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
          Booker:
        </h3>
        <p>{bookingContact.bookerName}</p>
        <p>{bookingContact.bookerEmail}</p>
        <p>{bookingContact.bookerPh}</p>
      </div>
      <div className="col-span-2 col-start-1 row-span-1 row-start-4 flex h-min gap-3">
        <Button type="secondary">Find radio stations near here</Button>
        <Button type="secondary">Find newspapers near here</Button>
        <Button type="secondary">Find magazines/blogs near here</Button>
      </div>
    </>
  );
}

export default VenueInfo;
