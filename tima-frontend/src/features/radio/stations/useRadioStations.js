import { useQuery } from '@tanstack/react-query';
import {
  getRadioStations,
  getRadioStationsWithin,
} from '../../../services/apiRadio';

export function useRadioStations(options) {
  const {
    data: radioStations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['radiostations', options],
    queryFn: getRadioStations,
  });

  return { isLoading, radioStations, error };
}

export function useRadioStationsWithin(latlng, distance, unit) {
  const {
    data: radioStations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['radiostations', latlng, distance, unit],
    queryFn: getRadioStationsWithin,
  });

  return { isLoading, radioStations, error };
}
