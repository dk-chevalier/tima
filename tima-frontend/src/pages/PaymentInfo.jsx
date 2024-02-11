import { useSelector } from 'react-redux';
import { selectStripePrice } from '../features/signup/newUserSlice';
import { useActionData } from 'react-router-dom';

function PaymentInfo() {
  const stripePriceId = useSelector(selectStripePrice);

  const data = useActionData();

  // console.log(data);

  return <div>PAYMENT INFO</div>;
}

export default PaymentInfo;

export const loader = async ({ request, params }) => {
  console.log(request);
  return null;
};
