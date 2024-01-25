import RadioStationInfo from '../features/radio/stations/RadioStationInfo';
import { getRadioStation } from '../services/apiRadio';
import Details from '../ui/Details';

function RadioStationDetails() {
  return (
    <Details>
      <RadioStationInfo />
    </Details>
  );
}

export default RadioStationDetails;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id: stationId } = params;
    if (queryClient.getQueryData(['radiostation', stationId]))
      return queryClient.getQueryData(['radiostation', stationId]);

    const radioStation = await queryClient.fetchQuery({
      queryKey: ['radiostation', stationId],
      queryFn: getRadioStation,
    });
    return radioStation;
  };
