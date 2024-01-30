import { redirect, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import RadioStationInfo from '../features/radio/stations/RadioStationInfo';
import { getRadioStation } from '../services/apiRadio';
import Details from '../ui/Details';
import { getIsLoggedIn } from '../services/apiUsers';

function RadioStationDetails() {
  const { url } = useRouteLoaderData('radioStation');
  return (
    <Details query={url.search}>
      <RadioStationInfo />
    </Details>
  );
}

export default RadioStationDetails;

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const { isLoggedIn } = await queryClient.fetchQuery({
      queryKey: ['isLoggedIn'],
      queryFn: getIsLoggedIn,
    });

    if (!isLoggedIn) return redirect('/login');

    const url = new URL(request.url);
    const { id: stationId } = params;
    if (queryClient.getQueryData(['radiostation', stationId]))
      return {
        radioStation: queryClient.getQueryData(['radiostation', stationId]),
        url,
      };

    const radioStation = await queryClient.fetchQuery({
      queryKey: ['radiostation', stationId],
      queryFn: getRadioStation,
    });
    return { radioStation, url };
  };
