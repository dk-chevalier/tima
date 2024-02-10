import { useSelector } from 'react-redux';
import { selectStripePrice } from './newUserSlice';

function PaymentInfo() {
  const stripePriceId = useSelector(selectStripePrice);

  console.log(stripePriceId);

  return <div>PAYMENT INFO</div>;
}

export default PaymentInfo;
