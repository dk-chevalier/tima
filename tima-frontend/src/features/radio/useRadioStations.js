import { useQuery } from '@tanstack/react-query';
import { getRadioStations } from '../../services/apiRadio';

export function useRadioStations() {
  const {
    data: radioStations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['radiostations'],
    queryFn: getRadioStations,
  });

  return { isLoading, radioStations, error };
}
