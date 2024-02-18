import { Outlet, redirect } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';
import { getVenues } from '../services/apiVenues';
import { getIsLoggedIn } from '../services/apiUsers';
import toast from 'react-hot-toast';

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
    const genres = url.searchParams.get('genres');
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

    const options = { lng, lat, searchName, genres, gigType };

    // Check if the query results already exist in the cache
    if (queryClient.getQueryData(['venues', options]))
      return { venues: queryClient.getQueryData(['venues', options]), url };

    const venues = await queryClient.fetchQuery({
      queryKey: ['venues', options],
      queryFn: getVenues,
    });

    console.log(venues);
    if (venues.status === 'fail' || venues.status === 'error') {
      // Reset the queries if there is an error, otherwise if they try moving to venues page again after being redirected once, it will draw on the cached venues request, which is a failure, even if they have since updated their payments (also wasn't redirecting the second time, because it wasn't fetching the venues, as was getting caught at first if statement)
      queryClient.resetQueries({ queryKey: ['venues', options] });
      toast.error(venues.message);
      return redirect('/app/account');
    }

    return { venues, url };
  };
