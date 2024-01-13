import { Layer } from 'react-map-gl';

function MapMarkersLayer() {
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
  return <Layer {...layerStyle} />;
}

export default MapMarkersLayer;
