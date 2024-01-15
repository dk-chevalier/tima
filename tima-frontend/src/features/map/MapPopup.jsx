import { Popup } from 'react-map-gl';
import { selectOpenPopup } from './mapSlice';
import { useSelector } from 'react-redux';

function MapPopup() {
  console.log('POPUP LOAD');
  const popupInfo = useSelector(selectOpenPopup);

  return (
    popupInfo && (
      <Popup
        latitude={popupInfo.coordinates[1]}
        longitude={popupInfo.coordinates[0]}
        anchor="bottom"
        offset={24}
      >
        <div className=" bg-primary-100">
          <strong>{popupInfo.title}</strong>
          <br />
          <strong></strong>
          <p>{popupInfo.city}</p>
          <br />
          <strong>
            Contact Details:
            <br />
          </strong>
          {popupInfo.email}
        </div>
      </Popup>
    )
  );
}

export default MapPopup;
