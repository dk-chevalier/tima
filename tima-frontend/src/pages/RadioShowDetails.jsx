import RadioShowInfo from '../features/radio/shows/RadioShowInfo';
import { getRadioShow } from '../services/apiRadio';
import Details from '../ui/Details';

function RadioShowDetails() {
  return (
    <Details>
      <RadioShowInfo />
    </Details>
  );
}

export default RadioShowDetails;

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { showId } = params;
    if (queryClient.getQueryData(['radioshow', showId]))
      return queryClient.getQueryData(['radioshow', showId]);

    const radioShow = await queryClient.fetchQuery({
      queryKey: ['radioshow', showId],
      queryFn: getRadioShow,
    });
    return radioShow;
  };
