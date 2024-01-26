import { Outlet } from 'react-router-dom';
import VenuesList from '../features/venues/VenuesList';
import { getVenues } from '../services/apiVenues';

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

const venuesListQuery = {
  queryKey: ['venues'],
  queryFn: getVenues,
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
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

    if (queryClient.getQueryData(['venues', options]))
      return { venues: queryClient.getQueryData(['venues', options]), url };

    const venues = await queryClient.fetchQuery({
      queryKey: ['venues', options],
      queryFn: getVenues,
    });
    return { venues, url };
  };
