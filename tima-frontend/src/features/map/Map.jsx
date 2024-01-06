import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, { Source, Layer } from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useVenues } from '../venues/useVenues';
import { HiMiniMapPin } from 'react-icons/hi2';

// TODO: Make this a environment variable
const MAP_TOKEN =
  'pk.eyJ1IjoiZGstY2hldmFsaWVyIiwiYSI6ImNscXJ0bHF1dDJoc24yanJ5NnVnZ2xxZXAifQ.0rhupFXU4AuDPu-PMhg-cw';

function MapContainer() {
  const { isLoading: isLoadingVenues, venues } = useVenues();
  const mapRef = useRef(null);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const [zoom, setZoom] = useState(12);

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
      // console.log(lng, lat);
    },
    [geolocationPosition, getPosition],
  );

  console.log(mapLng);
  console.log(mapLat);

  if (isLoadingVenues) return;
  const geojsonMarkers = {
    type: 'FeatureCollection',
    features: venues.data.map((venue) => {
      const data = {
        type: 'Feature',
        geometry: venue.location,
        properties: {
          title: 'Mapbox',
        },
      };
      return data;
    }),
  };
  console.log(geojsonMarkers);

  // const onLoad = (e) => {
  //   if (mapRef.current) {
  //     const pinImage = new Image();
  //     // pinImage.onload = () => {
  //     if (!mapRef.current.hasImage('pin')) {
  //       mapRef.current.addImage('pin', pinImage, { sdf: true });
  //     }
  //     // };
  //     pinImage.src = '../../assets/mapPin.svg';
  //   }
  // };

  const layerStyle = {
    id: 'point',
    type: 'symbol',
    layout: {
      'icon-image': 'mapPin',
      'icon-anchor': 'bottom',
    },
    source: 'my-data',
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
      reuseMaps
      // onLoad={onLoad}
    >
      <Source id="my-data" type="geojson" data={geojsonMarkers}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

export default MapContainer;
