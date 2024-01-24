import VenuesSource from '../venues/VenuesSource';
import VenueMarkersLayer from '../venues/VenueMarkersLayer';
import MapPopup from './MapPopup';
import RadioStationsSource from '../radio/stations/RadioStationsSource';
import RadioStationMarkersLayer from '../radio/stations/RadioStationMarkersLayer';
import { useLocation } from 'react-router-dom';

function MapLayers() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes('venues') && (
        <VenuesSource>
          <VenueMarkersLayer />
          <MapPopup />
        </VenuesSource>
      )}
      {pathname.includes('radio') && (
        <RadioStationsSource>
          <RadioStationMarkersLayer />
          <MapPopup />
        </RadioStationsSource>
      )}
    </>
  );
}

export default MapLayers;
