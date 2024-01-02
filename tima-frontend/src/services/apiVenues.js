// TEMPORARY
const URL = 'http://127.0.0.1:8000';

export async function getVenues() {
  try {
    const res = await fetch(
      `${URL}/api/v1/venues?fields=venueName,address.city,bookingContact.bookerName,bookingContact.bookerEmail`,
    );
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Venues could not be loaded');
  }
}
