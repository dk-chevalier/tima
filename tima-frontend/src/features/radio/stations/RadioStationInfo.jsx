import { useRouteLoaderData } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi2';
import Button from '../../../ui/Button';
import { useState } from 'react';
import RadioShowsList from '../shows/RadioShowsList';

function RadioStationInfo() {
  // const { stationId } = useParams();
  // const { radioStation, isLoading, error } = useRadioStation(stationId);

  const { radioStation } = useRouteLoaderData('radioStation');

  const [showsOpen, setShowsOpen] = useState(false);

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
  } = radioStation.data;

  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col justify-center">
        <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
          {stationName}
        </h2>
        <a href={website} className="text-sm">
          {website}
        </a>
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
          Station contact details:
        </h3>
        <p>{stationPh}</p>
      </div>

      <div className="col-span-2 col-start-1 row-span-1 row-start-3 flex justify-between rounded-sm border border-secondary-300 bg-primary-300 p-6 shadow-md">
        <div>
          <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
            Music submissions:
          </h3>
          <p>{musicSubmissions.contactName}</p>
          <p>{musicSubmissions.email}</p>
        </div>
        {interviewRequests && (
          <div className="text-end">
            <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
              Interview requests:
            </h3>
            <p>
              {interviewRequests.contactName
                ? interviewRequests.contactName
                : ''}
            </p>
            <p>{interviewRequests.email ? interviewRequests.email : ''}</p>
          </div>
        )}
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
      {showsOpen && (
        <ul className="no-scrollbar col-span-2 col-start-1 mx-5 h-80 overflow-scroll rounded-md border border-secondary-300 px-12 py-4">
          <RadioShowsList stationId={stationId} />
        </ul>
      )}
    </>
  );
}

export default RadioStationInfo;
