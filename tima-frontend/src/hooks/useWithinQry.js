import { useRadioStationsWithin } from '../features/radio/stations/useRadioStations';

export function useWithinQry(withinQry, type, params) {
  if (type === 'station' && withinQry) return useRadioStationsWithin(params);
}
