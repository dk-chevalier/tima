import { useQuery } from '@tanstack/react-query';
import { getRadioStation } from '../../../services/apiRadio';

export function useRadioStation(stationId) {
  const {
    isLoading,
    data: radioStation,
    error,
  } = useQuery({
    queryKey: ['radiostation', stationId],
    queryFn: getRadioStation,
  });

  return { isLoading, radioStation, error };
}
