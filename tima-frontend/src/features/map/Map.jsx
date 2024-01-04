import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../index.css';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useVenues } from '../venues/useVenues';

// TODO: Make this a environment variable
const MAP_TOKEN =
  'pk.eyJ1IjoiZGstY2hldmFsaWVyIiwiYSI6ImNscXJ0bHF1dDJoc24yanJ5NnVnZ2xxZXAifQ.0rhupFXU4AuDPu-PMhg-cw';

mapboxgl.accessToken = MAP_TOKEN;

function Map() {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const { isLoading: isLoadingVenues, venues } = useVenues();

  // console.log(venues);

  const [mapPosition, setMapPosition] = useState(null);
  const [zoom, setZoom] = useState(12);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (!geolocationPosition) getPosition();

      setMapPosition(geolocationPosition);
      console.log(geolocationPosition);
    },
    [geolocationPosition, getPosition],
  );

  // Creating our map...
  useEffect(
    function () {
      if (map.current) return;

      // FIXME: Check if this is a bad practice??? (i.e. waiting to load map until mapPosition has users coordinates).....PROBABLY BAD BECAUSE WON'T LOAD MAP IF CAN'T GET USERS COORDS
      if (!mapPosition) return;

      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/dk-chevalier/clqvxp6s5011c01qrakfpaklj',
        center: mapPosition,
        zoom: zoom,
      });

      // add zoom controls to map
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // add map onload event (used to resize the map to its container and able to add functionality to logitad data later)
      map.current.on('load', () => {
        map.current.resize();

        // FIXME: CURRENTLY MARKERS ARE SLIGHTLY LEFT OF ACTUAL POSITION, AND MOVE WITH ZOOM....
        if (isLoadingVenues) return;
        venues.data.map((venue) =>
          new mapboxgl.Marker({ anchor: 'bottom', color: '#faa8fb' })
            .setLngLat(venue.location.coordinates)
            .addTo(map.current),
        );
      });

      // TODO: clean up on unmount (LEARN WHAT THIS IS ACTUALLY DOING)
      return () => map.current.remove();
    },
    [mapPosition, zoom, isLoadingVenues, venues],
  );

  return isLoadingPosition ? (
    <p>Loading Data...</p>
  ) : (
    <div className="map-container" ref={mapContainerRef} />
  );
}

export default Map;
