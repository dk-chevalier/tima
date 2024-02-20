import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

export async function getSubscriptionProducts() {
  try {
    const { data } = await axios.get(`${URL}/api/v1/subscriptions/products`);

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function cancelSubscription() {
  try {
    const { data } = await axios.patch(
      `${URL}/api/v1/subscriptions/cancel-subscription`,
      '',
      { withCredentials: true },
    );

    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
