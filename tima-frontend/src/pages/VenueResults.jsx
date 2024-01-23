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
  async ({ params }) => {
    if (queryClient.getQueryData(venuesListQuery.queryKey))
      return queryClient.getQueryData(venuesListQuery.queryKey);

    const venues = await queryClient.fetchQuery(venuesListQuery);
    return venues;
  };
