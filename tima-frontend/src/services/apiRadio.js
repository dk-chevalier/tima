const URL = import.meta.env.VITE_LOCAL_URL;

export async function getRadioStations() {
  try {
    const res = await fetch(`${URL}/api/v1/radioStations`);
    const { data } = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Radio stations could not be loaded');
  }
}
