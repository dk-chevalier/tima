import { useLocation } from 'react-router-dom';
import VenuesSource from '../venues/VenuesSource';
import VenueMarkersLayer from '../venues/VenueMarkersLayer';
import MapPopup from './MapPopup';
import RadioStationsSource from '../radio/stations/RadioStationsSource';
import RadioStationMarkersLayer from '../radio/stations/RadioStationMarkersLayer';

// having pathname and booleans based on that outside the component means won't re-render MapLayers if pathname changes but we still want same layer, e.g. by opening details page of a venue while we are displaying the venues list anyway
const pathname = window.location.pathname;

const showVenues = pathname.includes('venues');

const showRadio = pathname.includes('radio');

function MapLayers() {
  console.log('POPUP LOAD');
  // const { pathname } = useLocation();
  return (
    <>
      {showVenues && (
        <VenuesSource>
          <VenueMarkersLayer />
          <MapPopup />
        </VenuesSource>
      )}
      {showRadio && (
        <RadioStationsSource>
          <RadioStationMarkersLayer />
          <MapPopup />
        </RadioStationsSource>
      )}
    </>
  );
}

export default MapLayers;
