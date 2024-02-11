import { Form, useLoaderData } from 'react-router-dom';
import Button from '../ui/Button';
import axios from 'axios';
import { getSubscriptionProducts } from '../services/apiSubscriptions';
import { useSelector } from 'react-redux';
import { selectStripePrice } from '../features/signup/newUserSlice';
import { redirect } from 'react-router-dom';

const URL = import.meta.env.VITE_LOCAL_URL;

function CreateAccount() {
  const { products, prices } = useLoaderData();

  const selectedPrice = useSelector(selectStripePrice);

  // console.log(selectedPrice);

  // console.log(products);
  // console.log(prices);

  return (
    <Form method="post">
      <div>
        <label>
          Full name:
          <input type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          Email address:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <div>
        <label>
          Confirm password:
          <input type="password" name="passwordConfirm" />
        </label>
      </div>

      <div>
        <label>
          Selected plan:
          <select defaultValue={selectedPrice} name="stripePriceId">
            {products.data.map((product) => {
              const productsPrices = prices.data.filter(
                (price) => product.id === price.product,
              );

              return productsPrices.map((price) => (
                <option value={price.id} key={price.id}>
                  {product.name} Plan - ${price.unit_amount / 100}
                  {price.currency}/{price.recurring.interval}
                </option>
              ));
            })}
          </select>
        </label>
      </div>
      <Button type="submit">Next</Button>
    </Form>
  );
}

export default CreateAccount;

export const loader = async () => {
  const { data } = await getSubscriptionProducts();

  return data;
};

export async function action({ request }) {
  console.log(request);
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');
  const stripePriceId = formData.get('stripePriceId');

  try {
    const { data } = await axios.post(`${URL}/api/v1/users/signup`, {
      name,
      email,
      password,
      passwordConfirm,
      genres: [],
      stripePriceId,
    });

    console.log(data);

    // redirect('/signup/payment-info');
    return new Response(JSON.stringify(data.data), {
      status: 302,
      headers: { Location: '/signup/payment-info' },
      body: JSON.stringify(data.data),
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
