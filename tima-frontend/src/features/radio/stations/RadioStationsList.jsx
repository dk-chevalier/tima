import { useParams, useRouteLoaderData } from 'react-router-dom';
import ListItem from '../../../ui/ListItem';
import Spinner from '../../../ui/Spinner';
import { useRadioStations } from './useRadioStations';
import { useQuery } from '@tanstack/react-query';

function RadioStationsList() {
  // const { latlng, distance, unit } = useParams();
  // const { radioStations, isLoading, error } = useRadioStations({
  //   latlng,
  //   distance,
  //   unit,
  // });
  const { radioStations, url } = useRouteLoaderData('radioStations');

  // console.log(radioStations);

  // return <div>RADIO</div>;
  return (
    <>
      {radioStations.data.map((station) => (
        <ListItem
          type="station"
          name={station.stationName}
          contactEmail={station.musicSubmissions.email}
          city={station.address.city}
          key={station.id}
          id={station.id}
          website={station.website}
          query={url.search}
        />
      ))}
    </>
  );
}

export default RadioStationsList;
