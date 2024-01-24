import { Source } from 'react-map-gl';
import { useVenues } from './useVenues';
import { useRouteLoaderData } from 'react-router-dom';

function VenuesSource({ children }) {
  // const { isLoading: isLoadingVenues, venues } = useVenues();
  const { data: venues } = useRouteLoaderData('venues');

  // if (isLoadingVenues) return;
  const geojsonMarkers = {
    type: 'FeatureCollection',
    features: venues.map((venue) => {
      const data = {
        type: 'Feature',
        geometry: venue.location,
        properties: {
          title: venue.venueName,
          id: venue.id,
          address: venue.address,
          email: venue.bookingContact.bookerEmail,
          type: 'venue',
        },
      };
      return data;
    }),
  };

  return (
    <Source id="venue-markers" type="geojson" data={geojsonMarkers}>
      {children}
    </Source>
  );
}

export default VenuesSource;
