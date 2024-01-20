import ListItem from '../../../ui/ListItem';
import Spinner from '../../../ui/Spinner';
import { useRadioStations } from './useRadioStations';

function RadioStationsList() {
  const { radioStations, isLoading } = useRadioStations();

  // return <div>RADIO LIST</div>;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        radioStations.data.map((station) => (
          <ListItem
            type="station"
            name={station.stationName}
            contactEmail={station.musicSubmissions.email}
            city={station.address.city}
            key={station.id}
            id={station.id}
            website={station.website}
          />
        ))
      )}
    </>
  );
}

export default RadioStationsList;
