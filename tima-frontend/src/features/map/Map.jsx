import { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useDispatch } from 'react-redux';
import { closePopup, openPopup, updatePopup } from './mapSlice';
// import { useNavigate } from 'react-router-dom';

import MapLayers from './MapLayers';
import Spinner from '../../ui/Spinner';
// import { useRouteLoaderData } from 'react-router-dom';
// import { useMapLayerClick } from '../../hooks/useMapLayerClick';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function MapContainer() {
  console.log('MAP LOAD');
  const mapRef = useRef(null);
  // TODO: find best way to move map viewport when there are coordinate params...below might be best, but this means rerendering map (perhaps could move without that happening?)
  // const latlng = useRouteLoaderData('map');
  // console.log(latlng);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const zoom = 12;

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // on each render check if we already have users geolocation, otherwise get it
  // TODO: could probably store this info in a Slice so don't have to search multiple times??
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

  // mapRef.current.flyTo({ center: [0, 0], zoom: 9 });

  const onMouseLeave = () => {
    // setPopupInfo(null);
    mapRef.current.getCanvas().style.cursor = 'grab';

    dispatch(closePopup());
  };

  // const onClick = useMapLayerClick();

  return isLoadingPosition || !mapLng || !mapLat ? (
    <Spinner />
  ) : (
    <Map
      id="timaMap"
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
