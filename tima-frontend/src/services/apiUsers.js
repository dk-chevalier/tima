import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

export async function getCurrentUser() {
  const { data } = await axios.get(`${URL}/api/v1/users/me`, {
    withCredentials: true,
  });

  return data.data;
}
