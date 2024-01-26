import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import VenueInfo from '../features/venues/VenueInfo';
import { getVenue } from '../services/apiVenues';
import Details from '../ui/Details';

function VenueDetails() {
  const { url } = useRouteLoaderData('venue');
  console.log(url);

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
    const url = new URL(request.url);
    const { id: venueId } = params;
    if (queryClient.getQueryData(['venue', venueId]))
      return { venue: queryClient.getQueryData(['venue', venueId]), url };

    const venue = await queryClient.fetchQuery({
      queryKey: ['venue', venueId],
      queryFn: getVenue,
    });
    return { venue, url };
  };
