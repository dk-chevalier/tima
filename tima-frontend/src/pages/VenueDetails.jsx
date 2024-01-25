import VenueInfo from '../features/venues/VenueInfo';
import { getVenue } from '../services/apiVenues';
import Details from '../ui/Details';

function VenueDetails() {
  return (
    <Details>
      <VenueInfo />
    </Details>
  );
}

export default VenueDetails;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id: venueId } = params;
    if (queryClient.getQueryData(['venue', venueId]))
      return queryClient.getQueryData(['venue', venueId]);

    const venue = await queryClient.fetchQuery({
      queryKey: ['venue', venueId],
      queryFn: getVenue,
    });
    return venue;
  };
