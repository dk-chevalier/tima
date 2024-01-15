import ListItem from '../../ui/ListItem';
import Spinner from '../../ui/Spinner';
import { useRadioStations } from './useRadioStations';

function RadioList() {
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
            key={station.stationName}
          />
        ))
      )}
    </>
  );
}

export default RadioList;
