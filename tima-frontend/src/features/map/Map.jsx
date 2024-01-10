import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useVenues } from '../venues/useVenues';
import { HiMiniMapPin } from 'react-icons/hi2';

// TODO: Make this a environment variable
const MAP_TOKEN =
  'pk.eyJ1IjoiZGstY2hldmFsaWVyIiwiYSI6ImNscXJ0bHF1dDJoc24yanJ5NnVnZ2xxZXAifQ.0rhupFXU4AuDPu-PMhg-cw';

function MapContainer() {
  const { isLoading: isLoadingVenues, venues } = useVenues();
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const layerRef = useRef(null);

  const [mapLng, setMapLng] = useState(null);
  const [mapLat, setMapLat] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [popupInfo, setPopupInfo] = useState(null);

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
  console.log(venues);
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
  console.log(geojsonMarkers);

  const layerStyle = {
    id: 'point',
    type: 'symbol',
    layout: {
      'icon-image': 'mapPin',
      'icon-anchor': 'bottom',
    },
    source: 'my-data',
  };

  const onMouseEnter = (e) => {
    mapRef.current.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    const { title, id, address, bookingContact } = e.features[0].properties;

    const { city } = JSON.parse(address);
    const { bookerName, bookerEmail } = JSON.parse(bookingContact);

    setPopupInfo({ title, id, city, bookerName, bookerEmail, coordinates });
  };

  const onMouseLeave = (e) => {
    setPopupInfo(null);
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
        {popupInfo && (
          <Popup
            ref={popupRef}
            latitude={popupInfo.coordinates[1]}
            longitude={popupInfo.coordinates[0]}
            anchor="bottom"
          >
            <div className=" bg-primary-100">
              <strong>{popupInfo.title}</strong>
              <br />
              <strong></strong>
              <p>{popupInfo.city}</p>
              <br />
              <strong>
                Booking Details:
                <br />
              </strong>
              {popupInfo.bookerName}
              <br />
              {popupInfo.bookerEmail}
            </div>
          </Popup>
        )}
      </Source>
    </Map>
  );
}

export default MapContainer;
