import { useParams, useRouteLoaderData } from 'react-router-dom';
import { Map, useMap } from 'react-map-gl';
import { useVenue } from './useVenue';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import StyledNavLink from '../../ui/StyledNavLink';
import { useState } from 'react';
import Toggle from '../../ui/Toggle';
import Dialog from '../dialog/Dialog';
import SuggestVenueUpdates from './SuggestVenueUpdates';
import { current } from '@reduxjs/toolkit';

function VenueInfo() {
  // const { venueId } = useParams();
  // const { venue, isLoading, error } = useVenue(venueId);

  // grab the venue data that was loaded with react router when this route was loaded
  const { venue } = useRouteLoaderData('venue');
  console.log(venue);

  // state to keep track of whether we are showing the confirmed data or the proposed updates
  const [showProposedUpdates, setShowProposedUpdates] = useState(false);

  // Destructure and store `venue` object
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

  // Move map to selected venues coordinates
  const { timaMap } = useMap();

  // use if statement, otherwise tries to load VenueInfo page before it recognises the .flyto() function and causes an error
  if (timaMap && lng && lat) timaMap.flyTo({ center: [lng, lat] });

  // Layout of Details/Info page for an individual Venue
  // Uses above `showProposedUpdates` state to either show current confirmed info or
  // updated info that has been suggested by users
  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 mb-5 flex flex-col justify-center">
        {/* TOGGLE BETWEEN CONFIRMED DATA AND SUGGESTED UPDATED DATA */}
        <div className="mb-8">
          <Toggle
            type="toggleOptionsSmall"
            onChange={() => setShowProposedUpdates(!showProposedUpdates)}
            checked={showProposedUpdates}
            optionOne={
              <div className="text-center">
                <p className="text-xs">Confirmed details</p>
              </div>
            }
            optionTwo={
              <div className="text-center">
                <p className="text-xs">Suggested details</p>
              </div>
            }
          />
        </div>

        {/* VENUE NAME */}
        {/* had to add conditional on suggestedUpdates.* in case there have never been suggested updates and the fields simply don't exist */}
        {showProposedUpdates && suggestedUpdates?.venueName?.venueName ? (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light text-secondary-600">
            {suggestedUpdates.venueName.venueName}
          </h2>
        ) : (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
            {venueName}
          </h2>
        )}

        {/* WEBSITE */}
        {showProposedUpdates && suggestedUpdates?.website?.website ? (
          <a
            href={suggestedUpdates.website.website}
            className="text-sm text-secondary-600"
          >
            {suggestedUpdates.website.website}
          </a>
        ) : (
          <a href={website} className="text-sm">
            {website}
          </a>
        )}
      </div>

      {/* FIXME: the size of this (being 1 column width, is what is covering the 'Suggested Details' button...need to fix this) */}
      <div className="relative right-[-0.5rem] top-4 col-span-1 col-start-2 row-span-1 row-start-1 flex flex-col items-end text-right text-xs opacity-60">
        {/* RATINGS */}
        <div>
          <p>{ratingsAverage}/5 stars</p>
          <p>from {ratingsQuantity} ratings</p>
        </div>

        {/* VENUE SUPPORTS ORIGINALS ??? */}
        {showProposedUpdates &&
        // conditional statement has to be like this in order to worker properly both if the suggested update is false and if it doesn't exist (i.e. is falsy but not actually false)
        (suggestedUpdates?.originals?.originals === true ||
          suggestedUpdates?.originals?.originals === false) ? (
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
        (suggestedUpdates?.soundSystemProvided?.soundSystemProvided === true ||
          suggestedUpdates?.soundSystemProvided?.soundSystemProvided ===
            false) ? (
          <p className="text-secondary-600">
            {suggestedUpdates.soundSystemProvided.soundSystemProvided
              ? 'PA provided'
              : 'BYO PA'}
          </p>
        ) : (
          <p>{soundSystemProvided ? 'PA provided' : 'BYO PA'}</p>
        )}

        {/* CAPACITY */}
        {showProposedUpdates && suggestedUpdates?.capacity?.capacity ? (
          <p className="text-secondary-600">
            {suggestedUpdates.capacity.capacity} capacity
          </p>
        ) : (
          <p>{capacity} capacity</p>
        )}

        {/* GIG TYPE */}
        {showProposedUpdates && suggestedUpdates?.gigType?.gigType ? (
          <p className="text-secondary-600">
            {suggestedUpdates.gigType.gigType === 'both'
              ? 'Both ticketed & free-entry gigs'
              : suggestedUpdates.gigType.gigType}
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
        {showProposedUpdates && suggestedUpdates?.address?.street?.street ? (
          <p className="text-secondary-600">
            {suggestedUpdates.address.street.street}
          </p>
        ) : (
          <p>{address.street}</p>
        )}

        <p>
          {/* CITY */}
          {showProposedUpdates && suggestedUpdates?.address?.city?.city ? (
            <span className="text-secondary-600">
              {suggestedUpdates.address.city.city},
            </span>
          ) : (
            <span>{address.city},</span>
          )}

          {/* STATE */}
          {showProposedUpdates && suggestedUpdates?.address?.state?.state ? (
            <span className="text-secondary-600">
              {' '}
              {suggestedUpdates.address.state?.state}
            </span>
          ) : (
            <span> {address.state}</span>
          )}
        </p>

        <p>
          {/* COUNTRY */}
          {showProposedUpdates &&
          suggestedUpdates?.address?.country?.country ? (
            <span className="text-secondary-600">
              {suggestedUpdates.address.country.country},
            </span>
          ) : (
            <span>{address.country},</span>
          )}

          {/* POSTCODE */}
          {showProposedUpdates &&
          suggestedUpdates?.address?.postcode?.postcode ? (
            <span className="text-secondary-600">
              {' '}
              {suggestedUpdates.address.postcode.postcode}
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
        {showProposedUpdates && suggestedUpdates?.venueEmail?.venueEmail ? (
          <p className="text-secondary-600">
            {suggestedUpdates.venueEmail.venueEmail}
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
        suggestedUpdates?.bookingContact?.bookerName?.bookerName ? (
          <p className="text-secondary-600">
            {suggestedUpdates.bookingContact.bookerName.bookerName}
          </p>
        ) : (
          <p>{bookingContact.bookerName}</p>
        )}

        {/* BOOKER EMAIL */}
        {showProposedUpdates &&
        suggestedUpdates?.bookingContact?.bookerEmail?.bookerEmail ? (
          <p className="text-secondary-600">
            {suggestedUpdates.bookingContact.bookerEmail.bookerEmail}
          </p>
        ) : (
          <p>{bookingContact.bookerEmail}</p>
        )}

        {/* BOOKER PH */}
        {showProposedUpdates &&
        suggestedUpdates?.bookingContact?.bookerPh?.bookerPh ? (
          <p className="text-secondary-600">
            {suggestedUpdates.bookingContact.bookerPh.bookerPh}
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

      <Dialog>
        <Dialog.Open opens="suggest-venue-updates">
          <Button type="secondary">Suggest updates</Button>
        </Dialog.Open>
        <Dialog.ModalWindow name="suggest-venue-updates">
          <SuggestVenueUpdates
            requestType={suggestedUpdates ? 'update' : 'create'}
          />
        </Dialog.ModalWindow>
      </Dialog>
    </>
  );
}

export default VenueInfo;
