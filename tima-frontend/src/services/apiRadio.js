import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

// RADIO STATION QUERIES
export async function getRadioStations({ queryKey }) {
  try {
    const [_, options] = queryKey;

    // TODO: HAVEN'T YET IMPLEMENTED GENRES SUPPORT BECAUSE THIS ONLY QUERIES RADIO STATIONS SO FAR, NOT SHOWS
    // const genresQry = `&genresSupported[in]=${options.genres}`;
    const byNameQry = `&stationName[eq]=${options.searchName}`;
    const byLocationQry = `&near=${options.lng},${options.lat}`;

    let res;
    if (options.distance) {
      res = await axios.get(
        `${URL}/api/v1/radioStations/radioStations-within/${options.distance}/centre/${options.lat},${options.lng}/unit/${options.unit}`,
        { withCredentials: true },
      );
    } else {
      res = await axios.get(
        `${URL}/api/v1/radioStations?fields=stationName,location,address.city,musicSubmissions,website${
          options.searchName ? byNameQry : ''
        }${options.lat && options.lng ? byLocationQry : ''}`,
        { withCredentials: true },
      );
    }

    return res.data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

export async function getRadioStation({ queryKey }) {
  try {
    const [_, stationId] = queryKey;

    const { data } = await axios.get(
      `${URL}/api/v1/radioStations/${stationId}`,
      { withCredentials: true },
    );

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio station could not be loaded');
  }
}

export async function getRadioStationsWithin({ queryKey }) {
  try {
    const [_, latlng, distance, unit] = queryKey;

    // const res = await fetch(
    //   `${URL}/api/v1/radioStations-within/${distance}/centre/${latlng}/unit/${unit}`,
    // );
    // const { data } = await res.json();

    const { data } = await axios.get(
      `${URL}/api/v1/radioStations-within/${distance}/centre/${latlng}/unit/${unit}`,
      { withCredentials: true },
    );

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}

// RADIO SHOW QUERIES
export async function getRadioShows({ queryKey }) {
  try {
    const [_, stationId] = queryKey;

    const { data } = await axios.get(
      `${URL}/api/v1/radioShows?radioStation=${stationId}`,
      { withCredentials: true },
    );

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio shows could not be loaded');
  }
}

export async function getRadioShow({ queryKey }) {
  try {
    const [_, showId] = queryKey;

    const { data } = await axios.get(`${URL}/api/v1/radioShows/${showId}`, {
      withCredentials: true,
    });

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio show could not be loaded');
  }
}
