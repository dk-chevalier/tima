import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

export async function getCurrentUser() {
  const { data } = await axios.get(`${URL}/api/v1/users/me`, {
    withCredentials: true,
  });

  return data.data;
}

export async function getIsLoggedIn() {
  const { data } = await axios.get(`${URL}/api/v1/users/isLoggedIn`, {
    withCredentials: true,
  });

  console.log(data.data);

  return data.data;
}
