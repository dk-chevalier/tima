const URL = import.meta.env.VITE_LOCAL_URL;

export async function getVenues() {
  try {
    console.log('FETCHING VENUES!!!!!!!!!!!!');
    const res = await fetch(
      `${URL}/api/v1/venues?fields=venueName,location,address.city,bookingContact.bookerName,bookingContact.bookerEmail,website`,
    );
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Venues could not be loaded');
  }
}
