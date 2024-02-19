import { redirect, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import RadioShowInfo from '../features/radio/shows/RadioShowInfo';
import { getRadioShow } from '../services/apiRadio';
import Details from '../ui/Details';
import { getIsLoggedIn } from '../services/apiUsers';
import toast from 'react-hot-toast';

import CustomToast from '../ui/CustomToast';

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

    // Check for cached data
    if (queryClient.getQueryData(['radioshow', showId]))
      return {
        radioShow: queryClient.getQueryData(['radioshow', showId]),
        url,
      };

    // No cache = fetch radio show
    const radioShow = await queryClient.fetchQuery({
      queryKey: ['radioshow', showId],
      queryFn: getRadioShow,
    });

    // error from fetch
    if (radioShow.status === 'fail' || radioShow.status === 'error') {
      // Reset the queries if there is an error, otherwise if they try moving to venues page again after being redirected once, it will draw on the cached venues request, which is a failure, even if they have since updated their payments (also wasn't redirecting the second time, because it wasn't fetching the venues, as was getting caught at first if statement)
      queryClient.resetQueries({ queryKey: ['radioshow', showId] });
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            {radioShow.message}
          </CustomToast>
        );
      });
      return redirect('/app/account');
    }
    return { radioShow, url };
  };
