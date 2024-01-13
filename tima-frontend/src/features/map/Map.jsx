import { useEffect, useRef, useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useVenues } from '../venues/useVenues';
import { useDispatch } from 'react-redux';
import { closePopup, openPopup, updatePopup } from './mapSlice';
import MapPopup from './MapPopup';

// TODO: Make this a environment variable
const MAP_TOKEN =
  'pk.eyJ1IjoiZGstY2hldmFsaWVyIiwiYSI6ImNscXJ0bHF1dDJoc24yanJ5NnVnZ2xxZXAifQ.0rhupFXU4AuDPu-PMhg-cw';

function MapContainer() {
  console.log('MAP LOAD');
  const { isLoading: isLoadingVenues, venues } = useVenues();
  const mapRef = useRef(null);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const [zoom, setZoom] = useState(12);

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

  const layerStyle = {
    id: 'point',
    type: 'symbol',
    layout: {
      'icon-image': 'mapPin',
      'icon-anchor': 'bottom',
      // get and display the title property from the source as a label to the marker
      'text-field': ['get', 'title'],
      'text-justify': 'auto',
      // means text disappears when collides with other icons but the symbol doesn't
      'text-optional': true,
      'text-variable-anchor': ['left', 'right'],
      // TODO: play with these values to get text aligned how you want...second value (meant to indicate offset down) doesn't seem to be working?
      'text-offset': [0.7, -1],
      'text-size': 12,
    },
    paint: {
      'text-color': '#011814',
    },
    source: 'my-data',
  };

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
      <Source id="my-data" type="geojson" data={geojsonMarkers}>
        <Layer {...layerStyle}></Layer>
        <MapPopup />
      </Source>
    </Map>
  );
}
export default MapContainer;
