import { redirect, useRouteLoaderData } from 'react-router-dom';
import VenueInfo from '../features/venues/VenueInfo';
import { getVenue } from '../services/apiVenues';
import Details from '../ui/Details';
import { getIsLoggedIn } from '../services/apiUsers';

function VenueDetails() {
  const { url } = useRouteLoaderData('venue');

  return (
    <Details query={url.search}>
      <VenueInfo />
    </Details>
  );
}

export default VenueDetails;

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const { isLoggedIn } = await queryClient.fetchQuery({
      queryKey: ['isLoggedIn'],
      queryFn: getIsLoggedIn,
    });

    if (!isLoggedIn) return redirect('/login');

    const url = new URL(request.url);
    const { id: venueId } = params;

    // Check if same query is cached
    if (queryClient.getQueryData(['venue', venueId]))
      return { venue: queryClient.getQueryData(['venue', venueId]), url };

    // No cache = fetch venue
    const venue = await queryClient.fetchQuery({
      queryKey: ['venue', venueId],
      queryFn: getVenue,
    });

    if (venue.status === 'fail' || venue.status === 'error') {
      // Reset the queries if there is an error, otherwise if they try moving to venues page again after being redirected once, it will draw on the cached venues request, which is a failure, even if they have since updated their payments (also wasn't redirecting the second time, because it wasn't fetching the venues, as was getting caught at first if statement)
      queryClient.resetQueries({ queryKey: ['venue', venueId] });
      return redirect('/app/account');
    }

    return { venue, url };
  };
