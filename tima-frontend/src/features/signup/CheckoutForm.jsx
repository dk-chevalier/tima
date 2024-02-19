import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';
import { selectStripePrice, updateStripePriceId } from './newUserSlice';
import Button from '../../ui/Button';
import axios from 'axios';
import CustomToast from '../../ui/CustomToast';
import toast from 'react-hot-toast';

const URL = import.meta.env.VITE_LOCAL_URL;
const tempURL = 'http://localhost:5173';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const { products, prices } = useRouteLoaderData('signup');

  const selectedPrice = useSelector(selectStripePrice);
  console.log(selectedPrice);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // below just means to wait for stripe to load before being able to submit
    if (!stripe) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      // FIXME: have to actually handle this error
      return;
    }

    const { data } = await axios
      .post(
        `${URL}/api/v1/subscriptions/create-subscription`,
        { stripePriceId: selectedPrice },
        { withCredentials: true },
      )
      .catch((err) => {
        console.error(err);
        toast.custom((t) => {
          t.duration = 10000;
          return (
            <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
              There was an error creating your subscription. Please check that
              your billing details are right, and try selecting a different plan
              and then re-selecting your plan from the drop down menu.
            </CustomToast>
          );
        });
      });

    console.log(data);

    const confirmIntent = stripe.confirmPayment;

    const { error } = await confirmIntent({
      elements,
      clientSecret: data.data.clientSecret,
      confirmParams: {
        return_url: `${tempURL}/app/account`,
      },
    });

    if (error) {
      console.error(error);
      toast.custom((t) => {
        t.duration = 5000;
        return (
          <CustomToast onClick={() => toast.remove(t.id)} type="error" t={t}>
            There was an error creating your subscription. Please check that
            your billing details are right, and try re-selecting your plan from
            the drop down menu.
          </CustomToast>
        );
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-base font-light">
        <label>
          <span className="mb-1 block">Selected plan:</span>
          <select
            defaultValue={selectedPrice}
            className="mb-2 w-full cursor-pointer rounded-md border border-gray-200 p-3 text-primary-900 shadow-sm"
            onChange={(price) => {
              return dispatch(updateStripePriceId(price.target.value));
            }}
          >
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
      <PaymentElement />
      <div className="mx-auto h-min w-min p-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default CheckoutForm;
