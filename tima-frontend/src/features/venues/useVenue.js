import { useQuery } from '@tanstack/react-query';
import { getVenue } from '../../services/apiVenues';

export function useVenue(venueId) {
  const {
    isLoading,
    data: venue,
    error,
  } = useQuery({ queryKey: ['venue', venueId], queryFn: getVenue });

  return { isLoading, venue, error };
}
