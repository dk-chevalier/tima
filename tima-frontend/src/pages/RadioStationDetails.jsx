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

    // check for cached data
    if (queryClient.getQueryData(['radiostation', stationId]))
      return {
        radioStation: queryClient.getQueryData(['radiostation', stationId]),
        url,
      };

    // no cache = fetch radio station
    const radioStation = await queryClient.fetchQuery({
      queryKey: ['radiostation', stationId],
      queryFn: getRadioStation,
    });

    // error from fetch
    if (radioStation.status === 'fail' || radioStation.status === 'error') {
      // Reset the queries if there is an error, otherwise if they try moving to venues page again after being redirected once, it will draw on the cached venues request, which is a failure, even if they have since updated their payments (also wasn't redirecting the second time, because it wasn't fetching the venues, as was getting caught at first if statement)
      queryClient.resetQueries({ queryKey: ['radiostation', stationId] });
      return redirect('/app/account');
    }

    return { radioStation, url };
  };
