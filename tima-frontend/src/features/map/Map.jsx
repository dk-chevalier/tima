import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useDispatch } from 'react-redux';
import { closePopup, openPopup, updatePopup } from './mapSlice';

import MapLayers from './MapLayers';
import Spinner from '../../ui/Spinner';
// import { useMapLayerClick } from '../../hooks/useMapLayerClick';

// TODO: Make this a environment variable
const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

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
    const { title, id, address, email } = e.features[0].properties;

    const { city } = JSON.parse(address);

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
    <Spinner />
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
      // FIXME: onClick function I made means that map re-renders every time pathname changes again...one way to fix is to not allow clicking on markers and instead highlight the associated sidebar tab???
      // onClick={(e) => onClick(e)}
      reuseMaps
      // onLoad={onLoad}
    >
      <MapLayers />
    </Map>
  );
}
export default MapContainer;
