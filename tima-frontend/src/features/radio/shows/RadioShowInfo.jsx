import { useParams } from 'react-router-dom';
import { useRadioShow } from './useRadioShow';

function RadioShowInfo() {
  const { showId } = useParams();
  const radioShow = useRadioShow(showId);

  console.log(radioShow);

  return <div>RADIO SHOW</div>;
}

export default RadioShowInfo;
