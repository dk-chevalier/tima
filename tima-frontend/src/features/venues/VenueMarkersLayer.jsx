import { Layer } from 'react-map-gl';

function VenueMarkersLayer() {
  const layerStyle = {
    id: 'point',
    type: 'symbol',
    layout: {
      'icon-allow-overlap': true,
      'icon-image': 'mapPin',
      'icon-anchor': 'bottom',
      // icon-ignore-placement true means other symbols can be visible even if they collide with the icon
      'icon-ignore-placement': true,
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
    source: 'venue-markers',
  };
  return <Layer {...layerStyle} />;
}

export default VenueMarkersLayer;
