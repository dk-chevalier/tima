import { Outlet, redirect } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';
import { getVenues } from '../services/apiVenues';
import { getCurrentUser, getIsLoggedIn } from '../services/apiUsers';
import toast from 'react-hot-toast';

import CustomToast from '../ui/CustomToast';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function VenueResults() {
  return (
    <>
      <VenuesList />
      <Outlet />
    </>
  );
}

export default VenueResults;

// const venuesListQuery = {
//   queryKey: ['venues'],
//   queryFn: getVenues,
// };

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const { isLoggedIn } = await queryClient.fetchQuery({
      queryKey: ['isLoggedIn'],
      queryFn: getIsLoggedIn,
    });

    if (!isLoggedIn) throw redirect('/login');

    let url = new URL(request.url);
    const searchFor = url.searchParams.get('searchingFor');
    const searchBy = url.searchParams.get('searchBy');
    const searchLocation = url.searchParams.get('searchLocation');
    const searchName = url.searchParams.get('searchName');
    let genres = url.searchParams.get('genres');
    const gigType = url.searchParams.get('gig-type');

    let lng;
    let lat;

    if (searchBy === 'location') {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchLocation}/.json?access_token=${MAP_TOKEN}`,
      );
      const { features } = await res.json();

      lng = features[0].center[0];
      lat = features[0].center[1];
    }

    // change `genres` to array of users genres if needed
    if (genres === 'saved-genres') {
      let currentUser;

      // check if users data is cached already
      if (queryClient.getQueryData(['me'])) {
        currentUser = queryClient.getQueryData(['me']);
      }

      currentUser = await queryClient.fetchQuery({
        queryKey: ['me'],
        queryFn: getCurrentUser,
      });

      genres = currentUser.data.genres;

      // if user hasn't provided a list of their genres yet, prompt them to do so
      if (genres.length < 1) {
        toast.custom((t) => {
          t.duration = 5000;
          return (
            <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
              <p>You have not yet told us what genres of music you play.</p>
              <p>
                Update your account and list of genres that you play for a more
                streamlined and personalised experience.
              </p>
            </CustomToast>
          );
        });
      }
    }

    const options = { lng, lat, searchName, genres, gigType };

    // Check if the query results already exist in the cache
    if (queryClient.getQueryData(['venues', options]))
      return { venues: queryClient.getQueryData(['venues', options]), url };

    const venues = await queryClient.fetchQuery({
      queryKey: ['venues', options],
      queryFn: getVenues,
    });

    if (venues.status === 'fail' || venues.status === 'error') {
      // Reset the queries if there is an error, otherwise if they try moving to venues page again after being redirected once, it will draw on the cached venues request, which is a failure, even if they have since updated their payments (also wasn't redirecting the second time, because it wasn't fetching the venues, as was getting caught at first if statement)
      queryClient.resetQueries({ queryKey: ['venues', options] });
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            {venues.message}
          </CustomToast>
        );
      });
      return redirect('/app/account');
    }

    return { venues, url };
  };
