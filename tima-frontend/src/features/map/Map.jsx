import { useEffect, useRef, useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useVenues } from '../venues/useVenues';
import { useDispatch } from 'react-redux';
import { closePopup, openPopup, updatePopup } from './mapSlice';
import MapPopup from './MapPopup';
import MapSource from './MapSource';
import MapMarkersLayer from './MapMarkersLayer';

// TODO: Make this a environment variable
const MAP_TOKEN =
  'pk.eyJ1IjoiZGstY2hldmFsaWVyIiwiYSI6ImNscXJ0bHF1dDJoc24yanJ5NnVnZ2xxZXAifQ.0rhupFXU4AuDPu-PMhg-cw';

function MapContainer() {
  console.log('MAP LOAD');
  const mapRef = useRef(null);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const zoom = 12;

  const dispatch = useDispatch();

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

  const onMouseEnter = (e) => {
    mapRef.current.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const { title, id, address, bookingContact } = e.features[0].properties;

    const { city } = JSON.parse(address);
    const { bookerName, bookerEmail } = JSON.parse(bookingContact);

    // setPopupInfo({ title, id, city, bookerName, bookerEmail, coordinates });
    dispatch(
      updatePopup({ title, id, city, bookerName, bookerEmail, coordinates }),
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
      <MapSource>
        <MapMarkersLayer />
        <MapPopup />
      </MapSource>
    </Map>
  );
}
export default MapContainer;
