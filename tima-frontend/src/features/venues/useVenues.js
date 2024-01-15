import { useQuery } from '@tanstack/react-query';
import { getVenues } from '../../services/apiVenues';

export function useVenues() {
  const {
    data: venues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  return { isLoading, venues, error };
}
