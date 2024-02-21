import { useParams, useRouteLoaderData } from 'react-router-dom';
import { useVenue } from './useVenue';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import StyledNavLink from '../../ui/StyledNavLink';
import { useState } from 'react';
import Toggle from '../../ui/Toggle';

function VenueInfo() {
  // const { venueId } = useParams();
  // const { venue, isLoading, error } = useVenue(venueId);

  const { venue } = useRouteLoaderData('venue');
  console.log(venue);

  const [showProposedUpdates, setShowProposedUpdates] = useState(false);
  // if (isLoading) return <Spinner />;

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
    location,
    suggestedUpdates,
  } = venue.data;

  const [lng, lat] = location.coordinates;

  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col justify-center">
        <div className="mb-5">
          <Toggle
            type="toggleOptionsSmall"
            checked={showProposedUpdates}
            onChange={() => setShowProposedUpdates(!showProposedUpdates)}
            optionOne={<p className="text-xs">Confirmed details</p>}
            optionTwo={<p className="text-xs">Proposed updates</p>}
          />
        </div>

        {/* VENUE NAME */}
        {showProposedUpdates && suggestedUpdates.venueNameUpdate.venueName ? (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light text-secondary-600">
            {suggestedUpdates.venueNameUpdate.venueName}
          </h2>
        ) : (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
            {venueName}
          </h2>
        )}

        {/* WEBSITE */}
        {showProposedUpdates && suggestedUpdates.websiteUpdate.website ? (
          <a
            href={suggestedUpdates.websiteUpdate.website}
            className="text-sm text-secondary-600"
          >
            {suggestedUpdates.websiteUpdate.website}
          </a>
        ) : (
          <a href={website} className="text-sm">
            {website}
          </a>
        )}
      </div>

      <div className="relative right-[-0.5rem] top-4 col-span-1 col-start-2 row-span-1 row-start-1 flex flex-col items-end text-right text-xs opacity-60">
        {/* RATINGS */}
        <div>
          <p>{ratingsAverage}/5 stars</p>
          <p>from {ratingsQuantity} ratings</p>
        </div>

        {/* VENUE SUPPORTS ORIGINALS ??? */}
        {showProposedUpdates &&
        // conditional statement has to be like this in order to worker properly both if the suggested update is false and if it doesn't exist (i.e. is falsy but not actually false)
        (suggestedUpdates.originalsUpdate.originals === true ||
          suggestedUpdates.originalsUpdate.originals === false) ? (
          <p className="text-secondary-600">
            {suggestedUpdates.originalsUpdate.originals
              ? 'Supports originals'
              : 'Covers gig'}
          </p>
        ) : (
          <p>{originals ? 'Supports originals' : 'Covers gig'}</p>
        )}

        {/* SOUND SYSTEM PROVIDED ?? */}
        {showProposedUpdates &&
        (suggestedUpdates.soundSystemProvidedUpdate.soundSystemProvided ===
          true ||
          suggestedUpdates.soundSystemProvidedUpdate.soundSystemProvided ===
            false) ? (
          <p className="text-secondary-600">
            {suggestedUpdates.soundSystemProvidedUpdate.soundSystemProvided
              ? 'PA provided'
              : 'BYO PA'}
          </p>
        ) : (
          <p>{soundSystemProvided ? 'PA provided' : 'BYO PA'}</p>
        )}

        {/* CAPACITY */}
        {showProposedUpdates && suggestedUpdates.capacityUpdate.capacity ? (
          <p className="text-secondary-600">
            {suggestedUpdates.capacityUpdate.capacity} capacity
          </p>
        ) : (
          <p>{capacity} capacity</p>
        )}

        {/* GIG TYPE */}
        {showProposedUpdates && suggestedUpdates.gigTypeUpdate.gigType ? (
          <p className="text-secondary-600">
            {suggestedUpdates.gigTypeUpdate.gigType === 'both'
              ? 'Both ticketed & free-entry gigs'
              : suggestedUpdates.gigTypeUpdate.gigType}
          </p>
        ) : (
          <p>
            {gigType === 'both' ? 'Both ticketed & free-entry gigs' : gigType}
          </p>
        )}
      </div>

      {/* ADDRESS DETAILS */}
      <div className="col-span-1 col-start-1 row-span-1 row-start-2">
        {/* STREET */}
        {showProposedUpdates &&
        suggestedUpdates.addressUpdates.streetUpdate.street ? (
          <p className="text-secondary-600">
            {suggestedUpdates.addressUpdates.streetUpdate.street}
          </p>
        ) : (
          <p>{address.street}</p>
        )}

        <p>
          {/* CITY */}
          {showProposedUpdates &&
          suggestedUpdates.addressUpdates.cityUpdate.city ? (
            <span className="text-secondary-600">
              {suggestedUpdates.addressUpdates.cityUpdate.city},
            </span>
          ) : (
            <span>{address.city},</span>
          )}

          {/* STATE */}
          {showProposedUpdates &&
          suggestedUpdates.addressUpdates.stateUpdate.state ? (
            <span className="text-secondary-600">
              {' '}
              {suggestedUpdates.addressUpdates.stateUpdate.state}
            </span>
          ) : (
            <span> {address.state}</span>
          )}
        </p>

        <p>
          {/* COUNTRY */}
          {showProposedUpdates &&
          suggestedUpdates.addressUpdates.countryUpdate.country ? (
            <span className="text-secondary-600">
              {suggestedUpdates.addressUpdates.countryUpdate.country},
            </span>
          ) : (
            <span>{address.country},</span>
          )}

          {/* POSTCODE */}
          {showProposedUpdates &&
          suggestedUpdates.addressUpdates.postcodeUpdate.postcode ? (
            <span className="text-secondary-600">
              {' '}
              {suggestedUpdates.addressUpdates.postcodeUpdate.postcode}
            </span>
          ) : (
            <span> {address.postcode}</span>
          )}
        </p>
      </div>

      {/* VENUE CONTACT DETAILS */}
      <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex flex-col items-end">
        <h3 className="mb-1 text-sm text-primary-800">
          Venue contact details:
        </h3>
        {/* VENUE PHONE */}
        {/* TODO: HAVE TO IMPLEMENT VENUE PHONE UPDATES!!!!!!!! */}
        <p>{venuePh}</p>

        {/* VENUE EMAIL */}
        {showProposedUpdates && suggestedUpdates.venueEmailUpdate.venueEmail ? (
          <p className="text-secondary-600">
            {suggestedUpdates.venueEmailUpdate.venueEmail}
          </p>
        ) : (
          <p>{venueEmail}</p>
        )}
      </div>

      {/* BOOKER DETAILS */}
      <div className="col-span-2 col-start-1 row-span-1 row-start-3 rounded-sm border border-secondary-300 bg-primary-300 p-6 shadow-md">
        <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
          Booker:
        </h3>

        {/* BOOKER NAME */}
        {showProposedUpdates &&
        suggestedUpdates.bookingContactUpdates.bookerNameUpdate.bookerName ? (
          <p className="text-secondary-600">
            {suggestedUpdates.bookingContactUpdates.bookerNameUpdate.bookerName}
          </p>
        ) : (
          <p>{bookingContact.bookerName}</p>
        )}

        {/* BOOKER EMAIL */}
        {showProposedUpdates &&
        suggestedUpdates.bookingContactUpdates.bookerEmailUpdate.bookerEmail ? (
          <p className="text-secondary-600">
            {
              suggestedUpdates.bookingContactUpdates.bookerEmailUpdate
                .bookerEmail
            }
          </p>
        ) : (
          <p>{bookingContact.bookerEmail}</p>
        )}

        {/* BOOKER PH */}
        {showProposedUpdates &&
        suggestedUpdates.bookingContactUpdates.bookerPhUpdate.bookerPh ? (
          <p className="text-secondary-600">
            {suggestedUpdates.bookingContactUpdates.bookerPhUpdate.bookerPh}
          </p>
        ) : (
          <p>{bookingContact.bookerPh}</p>
        )}
      </div>

      {/* FIND PR CONTACTS NEAR VENUE BUTTONS */}
      <div className="col-span-2 col-start-1 row-span-1 row-start-4 flex h-min gap-3">
        <StyledNavLink
          type="secondary"
          to={`/app/map/radio/${lat},${lng}/100/km`}
        >
          Find radio stations near here
        </StyledNavLink>
        <Button type="secondary">Find newspapers near here</Button>
        <Button type="secondary">Find magazines/blogs near here</Button>
      </div>
    </>
  );
}

export default VenueInfo;
