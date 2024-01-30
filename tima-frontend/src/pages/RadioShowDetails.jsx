import { redirect, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import RadioShowInfo from '../features/radio/shows/RadioShowInfo';
import { getRadioShow } from '../services/apiRadio';
import Details from '../ui/Details';
import { getIsLoggedIn } from '../services/apiUsers';

function RadioShowDetails() {
  const { url } = useRouteLoaderData('radioShow');
  return (
    <Details query={url.search}>
      <RadioShowInfo />
    </Details>
  );
}

export default RadioShowDetails;

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const { isLoggedIn } = await queryClient.fetchQuery({
      queryKey: ['isLoggedIn'],
      queryFn: getIsLoggedIn,
    });

    if (!isLoggedIn) return redirect('/login');

    const url = new URL(request.url);
    const { id: showId } = params;
    if (queryClient.getQueryData(['radioshow', showId]))
      return {
        radioShow: queryClient.getQueryData(['radioshow', showId]),
        url,
      };

    const radioShow = await queryClient.fetchQuery({
      queryKey: ['radioshow', showId],
      queryFn: getRadioShow,
    });
    return { radioShow, url };
  };
