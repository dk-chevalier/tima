import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useDispatch } from 'react-redux';
import { closePopup, openPopup, updatePopup } from './mapSlice';
import MapPopup from './MapPopup';
import { useLocation } from 'react-router-dom';
import VenuesSource from '../venues/VenuesSource';
import RadioStationsSource from '../radio/RadioStationsSource';
import RadioStationMarkersLayer from '../radio/RadioStationMarkersLayer';
import VenueMarkersLayer from '../venues/VenueMarkersLayer';

// TODO: Make this a environment variable
const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function MapContainer() {
  console.log('MAP LOAD');
  const mapRef = useRef(null);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const zoom = 12;

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (!geolocationPosition) return getPosition();

      const [lng, lat] = geolocationPosition;

      setMapLng(lng);
      setMapLat(lat);
    },
    [geolocationPosition, getPosition],
  );

  // FIXME: TO ALLOW FOR OTHER PAGES (i.e. map/radio, etc., not just map/venues)
  const onMouseEnter = (e) => {
    mapRef.current.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const { title, id, address, email } = e.features[0].properties;

    const { city } = JSON.parse(address);
    // const { bookerName, bookerEmail } = JSON.parse(bookingContact);

    // setPopupInfo({ title, id, city, bookerName, bookerEmail, coordinates });
    dispatch(
      updatePopup({
        title,
        id,
        city,
        email,
        coordinates,
      }),
    );
    dispatch(openPopup());
  };

  const onMouseLeave = () => {
    // setPopupInfo(null);
    mapRef.current.getCanvas().style.cursor = 'grab';

    dispatch(closePopup());
  };

  return isLoadingPosition || !mapLng || !mapLat ? (
    <p>Loading Data...</p>
  ) : (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAP_TOKEN}
      initialViewState={{ longitude: mapLng, latitude: mapLat, zoom: zoom }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/dk-chevalier/clqvxp6s5011c01qrakfpaklj"
      minPitch={0}
      maxPitch={0}
      interactiveLayerIds={['point']}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      reuseMaps
      // onLoad={onLoad}
    >
      {pathname === '/map/venues' && (
        <VenuesSource>
          <VenueMarkersLayer />
          <MapPopup />
        </VenuesSource>
      )}
      {pathname === '/map/radio' && (
        <RadioStationsSource>
          <RadioStationMarkersLayer />
          <MapPopup />
        </RadioStationsSource>
      )}
    </Map>
  );
}
export default MapContainer;
