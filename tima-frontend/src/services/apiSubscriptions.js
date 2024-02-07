import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

export async function getSubscriptionProducts() {
  try {
    const { data } = await axios.get(`${URL}/api/v1/subscriptions/products`);
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
}
