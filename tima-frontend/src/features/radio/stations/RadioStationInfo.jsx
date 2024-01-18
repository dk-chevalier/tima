import { useParams } from 'react-router-dom';
import { useRadioStation } from './useRadioStation';

function RadioStationInfo() {
  const { stationId } = useParams();
  const radioStation = useRadioStation(stationId);

  console.log(radioStation);

  return <div>RADIO STATION</div>;
}

export default RadioStationInfo;
