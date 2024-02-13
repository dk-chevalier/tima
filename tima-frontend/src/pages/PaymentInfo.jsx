import { useSelector } from 'react-redux';
import { selectStripePrice } from '../features/signup/newUserSlice';
import { Form, useActionData, useRouteLoaderData } from 'react-router-dom';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Button from '../ui/Button';
import axios from 'axios';
import CheckoutForm from '../features/signup/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const URL = import.meta.env.VITE_LOCAL_URL;

function PaymentInfo() {
  const options = {
    mode: 'subscription',
    amount: 2000,
    currency: 'aud',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentInfo;

// export async function action({ request }) {
//   const formData = await request.formData();
//   const stripePriceId = formData.get('stripePriceId');
//   console.log(stripePriceId);

//   try {
//     const { data } = await axios.post(
//       `${URL}/api/v1/subscriptions/create-subscription`,
//       { stripePriceId },
//       { withCredentials: true },
//     );
//     console.log(data);

//     const confirmIntent = Stripe.confirmPayment;

//     return null;
//   } catch (err) {
//     console.error(err.response.data.message);

//     return null;
//   }
// }
