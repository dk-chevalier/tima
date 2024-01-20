const URL = import.meta.env.VITE_LOCAL_URL;

// RADIO STATION QUERIES
export async function getRadioStations({ queryKey }) {
  try {
    console.log('fetching data!!!!!!!!!!!');
    const [_, options] = queryKey;
    let res;
    if (options.distance) {
      res = await fetch(
        `${URL}/api/v1/radioStations/radioStations-within/${options.distance}/centre/${options.latlng}/unit/${options.unit}`,
      );
    } else {
      res = await fetch(
        `${URL}/api/v1/radioStations?fields=stationName,location,address.city,musicSubmissions,website`,
      );
    }
    const { data } = await res.json();

    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

export async function getRadioStation({ queryKey }) {
  try {
    const [_, stationId] = queryKey;
    const res = await fetch(`${URL}/api/v1/radioStations/${stationId}`);
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio station could not be loaded');
  }
}

export async function getRadioStationsWithin({ queryKey }) {
  try {
    const [_, latlng, distance, unit] = queryKey;
    const res = await fetch(
      `${URL}/api/v1/radioStations-within/${distance}/centre/${latlng}/unit/${unit}`,
    );
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

// RADIO SHOW QUERIES
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
    throw new Error('Radio shows could not be loaded');
  }
}

export async function getRadioShow({ queryKey }) {
  try {
    const [_, showId] = queryKey;
    const res = await fetch(`${URL}/api/v1/radioShows/${showId}`);
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio show could not be loaded');
  }
}
