import { useQuery } from '@tanstack/react-query';
import { getRadioShow } from '../../../services/apiRadio';

export function useRadioShow({ showId }) {
  const {
    isLoading,
    data: radioShow,
    error,
  } = useQuery({ queryKey: ['radioshow', showId], queryFn: getRadioShow });

  return { isLoading, radioShow, error };
}
