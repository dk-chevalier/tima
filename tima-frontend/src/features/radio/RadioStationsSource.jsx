import { Source } from 'react-map-gl';
import { useRadioStations } from './useRadioStations';

function RadioStationsSource({ children }) {
  const { isLoading: isLoadingVenues, radioStations } = useRadioStations();

  if (isLoadingVenues) return;
  const geojsonMarkers = {
    type: 'FeatureCollection',
    features: radioStations.data.map((station) => {
      const data = {
        type: 'Feature',
        geometry: station.location,
        properties: {
          title: station.stationName,
          id: station.id,
          address: station.address,
          bookingContact: station.musicSubmissions.email,
        },
      };
      return data;
    }),
  };

  return (
    <Source id="radio-station-markers" type="geojson" data={geojsonMarkers}>
      {children}
    </Source>
  );
}

export default RadioStationsSource;
