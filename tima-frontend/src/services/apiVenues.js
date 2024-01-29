import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

export async function getVenues({ queryKey }) {
  try {
    const [_, options] = queryKey;
    // console.log(options);
    // const genresQry = `&`;
    const gigTypeQry = `&gigType[eq]=${options.gigType}`;
    const genresQry = `&genresSupported[in]=${options.genres}`;
    const byNameQry = `&venueName[eq]=${options.searchName}`;
    const byLocationQry = `&near=${options.lng},${options.lat}`;

    const { data } = await axios.get(
      `${URL}/api/v1/venues?fields=venueName,location,address.city,bookingContact.bookerName,bookingContact.bookerEmail,website${
        options.gigType ? gigTypeQry : ''
      }${options.genres ? genresQry : ''}${
        options.searchName ? byNameQry : ''
      }${options.lng && options.lat ? byLocationQry : ''}`,
      { withCredentials: true },
    );

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Venues could not be loaded');
  }
}

export async function getVenue({ queryKey }) {
  try {
    const [_, venueId] = queryKey;

    const { data } = await axios.get(`${URL}/api/v1/venues/${venueId}`, {
      withCredentials: true,
    });

    // const res = await fetch(`${URL}/api/v1/venues/${venueId}`);
    // const { data } = await res.json();

    return data.data;
  } catch (err) {
    console.error(err);
    throw new Error('Venue could not be loaded');
  }
}
