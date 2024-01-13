import { Source } from 'react-map-gl';
import { useVenues } from '../venues/useVenues';

function MapSource({ children }) {
  const { isLoading: isLoadingVenues, venues } = useVenues();

  if (isLoadingVenues) return;
  const geojsonMarkers = {
    type: 'FeatureCollection',
    features: venues.data.map((venue) => {
      const data = {
        type: 'Feature',
        geometry: venue.location,
        properties: {
          title: venue.venueName,
          id: venue.id,
          address: venue.address,
          bookingContact: venue.bookingContact,
        },
      };
      return data;
    }),
  };

  return (
    <Source id="my-data" type="geojson" data={geojsonMarkers}>
      {children}
    </Source>
  );
}

export default MapSource;
