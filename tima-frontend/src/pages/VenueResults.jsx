import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';
import { getVenues } from '../services/apiVenues';

function VenueResults() {
  return (
    <>
      <VenuesList />
      <Outlet />
    </>
  );
}

export default VenueResults;

const venuesListQuery = {
  queryKey: ['venues'],
  queryFn: getVenues,
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    let url = new URL(request.url);
    const searchFor = url.searchParams.get('searchingFor');
    const searchingBy = url.searchParams.get('searchingBy');
    const searchLocation = url.searchParams.get('searchLocation');
    const searchName = url.searchParams.get('searchName');
    const genres = url.searchParams.get('genres');
    const gigType = url.searchParams.get('gig-type');

    if (queryClient.getQueryData(venuesListQuery.queryKey))
      return queryClient.getQueryData(venuesListQuery.queryKey);

    const venues = await queryClient.fetchQuery(venuesListQuery);
    return venues;
  };
