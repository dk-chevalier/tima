const URL = import.meta.env.VITE_LOCAL_URL;

export async function getRadioStations() {
  try {
    console.log('FETCHING RADIO STATIONS************');
    const res = await fetch(
      `${URL}/api/v1/radioStations?fields=stationName,location,address.city,musicSubmissions,website`,
    );
    const { data } = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

export async function getRadioShows({ queryKey }) {
  try {
    console.log('FETCHING RADIO SHOWS^^^^^^^^^^');
    const [_, stationId] = queryKey;
    const res = await fetch(
      `${URL}/api/v1/radioShows?radioStation=${stationId}`,
    );
    const { data } = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}
