import { useQuery } from '@tanstack/react-query';
import { getRadioShows } from '../../../services/apiRadio';

export function useRadioShows(stationId) {
  const {
    data: radioShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['radioshows', stationId],
    queryFn: getRadioShows,
  });

  return { isLoading, radioShows, error };
}
