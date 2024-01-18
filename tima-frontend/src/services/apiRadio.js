const URL = import.meta.env.VITE_LOCAL_URL;

export async function getRadioStations() {
  try {
    const res = await fetch(
      `${URL}/api/v1/radioStations?fields=stationName,location,address.city,musicSubmissions,website`,
    );
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

export async function getRadioShows({ queryKey }) {
  try {
    const [_, stationId] = queryKey;
    const res = await fetch(
      `${URL}/api/v1/radioShows?radioStation=${stationId}`,
    );
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}
