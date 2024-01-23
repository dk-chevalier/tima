import VenueInfo from '../features/venues/VenueInfo';
import Details from '../ui/Details';

function VenueDetails() {
  return (
    <Details>
      <VenueInfo />
    </Details>
  );
}

export default VenueDetails;

export const loader = ({ params }) => {
  console.log(params);
};
