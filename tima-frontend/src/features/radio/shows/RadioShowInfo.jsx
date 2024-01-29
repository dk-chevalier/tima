import { useRouteLoaderData } from 'react-router-dom';
import StyledNavLink from '../../../ui/StyledNavLink';

function RadioShowInfo() {
  // const { showId } = useParams();
  // const { radioShow, isLoading, error } = useRadioShow(showId);

  // if (isLoading) return <Spinner />;

  const { radioShow } = useRouteLoaderData('radioShow');

  const {
    showName,
    hosts,
    genresSupported,
    showEmail,
    showWebpage,
    radioStation,
  } = radioShow.data;

  return (
    <>
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 flex flex-col justify-center">
        <h2 className="relative left-[-0.5rem] top-[-0.5rem] text-3xl font-light">
          {showName}
        </h2>
        <a href={showWebpage} className="text-sm">
          {showWebpage}
        </a>
      </div>

      <div className="relative right-[-0.5rem] top-4 col-span-1 col-start-2 row-span-1 row-start-1 flex flex-col items-end text-right text-xs opacity-60">
        <h3>Genres supported:</h3>
        <ul className="ul-cols-2">
          {genresSupported.map((genre) => {
            return <li key={genre}>{genre}</li>;
          })}
        </ul>
      </div>

      <div className="col-span-1 col-start-1 row-span-1 row-start-2">
        <h3 className="mb-1 text-sm text-primary-800">Show email:</h3>
        <p>{showEmail}</p>
      </div>

      <div className="col-span-1 col-start-2 row-span-1 row-start-2 text-end">
        <h3 className="mb-1 text-sm text-primary-800">Radio station:</h3>
        <StyledNavLink
          to={`/app/map/radio/stations/${radioStation.id}`}
          type="secondary"
        >
          {radioStation.stationName}
        </StyledNavLink>
      </div>

      <div className="col-span-2 col-start-1 row-span-1 row-start-3 rounded-sm border border-secondary-300 bg-primary-300 p-6 shadow-md">
        <h3 className="text-md relative left-[-2px] top-[-2px] mb-1 font-medium text-primary-800">
          Hosts:
        </h3>
        <ul className="ul-cols-2">
          {hosts.map((host) => {
            return (
              <li key={host.name}>
                <p>{host.name}</p>
                <p>{host.email}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default RadioShowInfo;
