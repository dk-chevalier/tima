import { Form, useRouteLoaderData } from 'react-router-dom';
import Button from '../ui/Button';
import axios from 'axios';
import { getSubscriptionProducts } from '../services/apiSubscriptions';
import { useSelector } from 'react-redux';
import { selectStripePrice } from '../features/signup/newUserSlice';
import { redirect } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToast from '../ui/CustomToast';

const URL = import.meta.env.VITE_LOCAL_URL;

function CreateAccount() {
  const { products, prices } = useRouteLoaderData('signup');

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

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');
  const stripePriceId = formData.get('stripePriceId');

  try {
    const { data } = await axios.post(
      `${URL}/api/v1/users/signup`,
      {
        name,
        email,
        password,
        passwordConfirm,
        genres: [],
        stripePriceId,
      },
      { withCredentials: true },
    );

    toast.custom((t) => {
      t.duration = 3000;
      return (
        <CustomToast onClick={() => toast.remove(t.id)} type="success" t={t}>
          Account created. Welcome {data.data.user.name.split(' ')[0]}
        </CustomToast>
      );
    });

    return redirect('/signup/payment-info');
  } catch (err) {
    console.error(err);

    toast.custom((t) => {
      t.duration = 5000;
      return (
        <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
          {err.response.data.message}
        </CustomToast>
      );
    });
    return null;
  }
}
