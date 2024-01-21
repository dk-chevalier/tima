import { Source } from 'react-map-gl';
import { useRadioStations } from './useRadioStations';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

function RadioStationsSource({ children }) {
  const { latlng, distance, unit } = useParams();
  const { isLoading: isLoadingStations, radioStations } = useRadioStations({
    latlng,
    distance,
    unit,
  });

  if (isLoadingStations) return;
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
          email: station.musicSubmissions.email,
          type: 'station',
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
