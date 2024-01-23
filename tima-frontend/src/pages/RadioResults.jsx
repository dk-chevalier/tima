import { Outlet } from 'react-router-dom';
import RadioStationsList from '../features/radio/stations/RadioStationsList';
import { getRadioStations } from '../services/apiRadio';

function RadioResults() {
  return (
    <>
      <RadioStationsList />
      <Outlet />
    </>
  );
}

export default RadioResults;

// const radioStationsQuery = {
//   queryKey: ['radiostations'],
//   queryFn: () => getRadioStations(),
// };

export const loader =
  (queryClient) =>
  ({ params }) => {
    const { latlng, distance, unit } = params;
    const options = { latlng, distance, unit };
    if (queryClient.getQueryData(['radiostations', options]))
      return queryClient.getQueryData(['radiostations', options]);

    const radioStations = queryClient.fetchQuery({
      queryKey: ['radiostations', options],
      queryFn: getRadioStations,
    });
    return radioStations;
  };
