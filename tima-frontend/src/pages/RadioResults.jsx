import { Outlet } from 'react-router-dom';
import RadioStationsList from '../features/radio/stations/RadioStationsList';
import { getRadioStations } from '../services/apiRadio';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

function RadioResults() {
  return (
    <>
      <RadioStationsList />
      <Outlet />
    </>
  );
}

export default RadioResults;

// const radioStationsQuery = {
//   queryKey: ['radiostations'],
//   queryFn: () => getRadioStations(),
// };

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const { latlng, distance, unit } = params;
    console.log(request);

    let url = new URL(request.url);
    const searchFor = url.searchParams.get('searchingFor');
    const searchBy = url.searchParams.get('searchBy');
    const searchLocation = url.searchParams.get('searchLocation');
    const searchName = url.searchParams.get('searchName');
    // TODO: HAVEN'T YET IMPLEMENTED GENRES FOR RADIO, BECAUSE ONLY SENDS TO RADIO STATIONS, NOT SHOWS SO FAR
    // const genres = url.searchParams.get('genres');

    let lng;
    let lat;

    if (searchBy === 'location') {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchLocation}/.json?access_token=${MAP_TOKEN}`,
      );
      const { features } = await res.json();

      lng = features[0].center[0];
      lat = features[0].center[1];
    }

    if (latlng) {
      const latlngArr = latlng.split(',');

      lat = latlngArr[0];
      lng = latlngArr[1];
    }

    // const options = { lng, lat, searchName, genres, gigType };
    const options = {
      lat,
      lng,
      distance,
      unit,
      searchBy,
      searchName,
    };
    if (queryClient.getQueryData(['radiostations', options]))
      return {
        radioStations: queryClient.getQueryData(['radiostations', options]),
        url,
      };

    const radioStations = await queryClient.fetchQuery({
      queryKey: ['radiostations', options],
      queryFn: getRadioStations,
    });
    return { radioStations, url };
  };
