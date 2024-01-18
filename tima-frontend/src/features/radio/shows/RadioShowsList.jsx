import ListItem from '../../../ui/ListItem';
import Spinner from '../../../ui/Spinner';
import { useRadioShows } from './useRadioShows';

function RadioShowsList({ stationId }) {
  const { radioShows, isLoading } = useRadioShows(stationId);

  // return <div>RADIO SHOWS</div>;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        radioShows.data.map((show) => (
          <ListItem
            type="show"
            name={show.showName}
            contactEmail={show.showEmail}
            key={show.id}
            id={show.id}
            website={show.showWebpage}
          />
        ))
      )}
    </>
  );
}

export default RadioShowsList;
