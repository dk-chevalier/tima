import { useRouteLoaderData } from 'react-router-dom';
import { useMap } from 'react-map-gl';
import { HiChevronDown } from 'react-icons/hi2';
import Button from '../../../ui/Button';
import { useState } from 'react';
import RadioShowsList from '../shows/RadioShowsList';
import Toggle from '../../../ui/Toggle';

function RadioStationInfo() {
  // const { stationId } = useParams();
  // const { radioStation, isLoading, error } = useRadioStation(stationId);

  const { radioStation } = useRouteLoaderData('radioStation');

  console.log(radioStation.data);
  const [showsOpen, setShowsOpen] = useState(false);

  const [showProposedUpdates, setShowProposedUpdates] = useState(false);

  function toggleRadioShows() {
    setShowsOpen(!showsOpen);
  }

  // if (isLoading) return <Spinner />;

  const {
    stationName,
    address,
    stationPh,
    website,
    musicSubmissions,
    interviewRequests,
    id: stationId,
    location,
    suggestedUpdates,
  } = radioStation.data;

  const [lng, lat] = location.coordinates;

  // Move map to selected venues coordinates
  const { timaMap } = useMap();

  // use if statement, otherwise tries to load VenueInfo page before it recognises the .flyto() function and causes an error
  if (timaMap && lng && lat) timaMap.flyTo({ center: [lng, lat] });

  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col justify-center">
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

        {/* RADIO STATION NAME */}
        {showProposedUpdates && suggestedUpdates?.stationName?.stationName ? (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light text-secondary-600">
            {suggestedUpdates.stationName.stationName}
          </h2>
        ) : (
          <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
            {stationName}
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
              {suggestedUpdates.address.state.state}
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

      {/* RADIO STATION CONTACT DETAILS */}
      <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex flex-col items-end">
        <h3 className="mb-1 text-sm text-primary-800">
          Station contact details:
        </h3>

        {/* RADIO STATION PHONE */}
        {showProposedUpdates && suggestedUpdates?.stationPh?.stationPh ? (
          <p className="text-secondary-600">
            {suggestedUpdates.stationPh.stationPh}
          </p>
        ) : (
          <p>{stationPh}</p>
        )}
      </div>

      {/* MUSIC SUBMISSIONS AND INTERVIEW REQUEST CONTACTS */}
      <div className="col-span-2 col-start-1 row-span-1 row-start-3 flex justify-between rounded-sm border border-secondary-300 bg-primary-300 p-6 shadow-md">
        {/* MUSIC SUBMISSIONS CONTACT DETAILS */}
        <div>
          <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
            Music submissions:
          </h3>
          {/* MUSIC SUBMISSIONS CONTACT NAME */}
          {showProposedUpdates &&
          suggestedUpdates?.musicSubmissions?.contactName?.contactName ? (
            <p className="text-secondary-600">
              {suggestedUpdates.musicSubmissions.contactName.contactName}
            </p>
          ) : (
            <p>{musicSubmissions.contactName}</p>
          )}

          {/* MUSIC SUBMISSIONS CONTACT EMAIL */}
          {showProposedUpdates &&
          suggestedUpdates?.musicSubmissions?.email?.email ? (
            <p className="text-secondary-600">
              {suggestedUpdates.musicSubmissions.email.email}
            </p>
          ) : (
            <p>{musicSubmissions.email}</p>
          )}
        </div>

        {/* INTERVIEW REQUESTS CONTACT DETAILS */}
        <div className="text-end">
          <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
            Interview requests:
          </h3>

          {/* INTERVIEW REQUESTS CONTACT NAME */}
          {showProposedUpdates &&
          suggestedUpdates?.interviewRequests?.contactName?.contactName ? (
            <p className="text-secondary-600">
              {suggestedUpdates.interviewRequests.contactName.contactName}
            </p>
          ) : (
            <p>{interviewRequests?.contactName}</p>
          )}

          {/* INTERVIEW REQUESTS CONTACT EMAIL */}
          {showProposedUpdates &&
          suggestedUpdates?.interviewRequests?.email?.email ? (
            <p className="text-secondary-600">
              {suggestedUpdates.interviewRequests.email.email}
            </p>
          ) : (
            <p>{interviewRequests?.email}</p>
          )}
        </div>
      </div>

      <div className="col-span-2 col-start-1 row-span-1 row-start-4 flex h-min gap-3">
        <Button type="secondary" onClick={toggleRadioShows}>
          Shows
          <span
            className={`flex origin-center duration-300 ${
              showsOpen ? 'rotate-180' : ''
            }`}
          >
            <HiChevronDown />
          </span>
        </Button>
      </div>
      {/* FIXME: Make it show suggested updates shows when `showProposedUpdates` is selected....must first make these updates available */}
      {showsOpen && (
        <ul className="no-scrollbar col-span-2 col-start-1 mx-5 h-80 overflow-scroll rounded-md border border-secondary-300 px-12 py-4">
          <RadioShowsList stationId={stationId} />
        </ul>
      )}
    </>
  );
}

export default RadioStationInfo;
