import { useRouteLoaderData } from 'react-router-dom';
import { getSubscriptionProducts } from '../services/apiSubscriptions';
import Toggle from '../ui/Toggle';
import { useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { updateStripePriceId } from '../features/signup/newUserSlice';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {
  const { products, prices } = useRouteLoaderData('home');

  const dispatch = useDispatch();

  console.log(products);
  console.log(prices);

  const [yearlyPriceSelected, setYearlyPriceSelected] = useState(false);

  // FIXME: only need isAuthenticated if wanting to conditionally render something....
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/app/account',
      },
    });
  };

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/app/account',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-primary-900">
      {products.data.map((product) => {
        const monthlyPrice = prices.data.filter(
          (price) =>
            price.product === product.id &&
            price.recurring.interval === 'month',
        )[0];

        const yearlyPrice = prices.data.filter(
          (price) =>
            price.product === product.id && price.recurring.interval === 'year',
        )[0];

        const selectedPriceId = yearlyPriceSelected
          ? yearlyPrice.id
          : monthlyPrice.id;

        return (
          <main
            className="no-scrollbar relative h-[85vh] max-h-[35rem] min-h-[25rem] w-[25rem] overflow-scroll rounded-md border border-secondary-300 bg-primary-100 p-8 font-light"
            key={product.id}
          >
            <h1 className="text-center text-3xl font-thin">
              {product.name} Plan
            </h1>

            {/* FIXME: SHOWING ONLY IF SOMEONE IS LOGGED IN */}
            {isAuthenticated && <div>YOU ARE ALREADY LOGGED IN</div>}

            <Toggle
              type="toggleOptions"
              onChange={() => setYearlyPriceSelected(!yearlyPriceSelected)}
              checked={yearlyPriceSelected}
              optionOne={
                <div
                  key={monthlyPrice.nickname}
                  className="flex flex-col text-center"
                >
                  <div>
                    ${monthlyPrice.unit_amount / 100}
                    <span className="text-xs opacity-50">
                      {monthlyPrice.currency}
                    </span>
                  </div>
                  <span className="text-sm">per month</span>
                </div>
              }
              optionTwo={
                <div
                  key={yearlyPrice.nickname}
                  className="flex flex-col text-center"
                >
                  <div>
                    ${yearlyPrice.unit_amount / 100}
                    <span className="text-xs opacity-50">
                      {yearlyPrice.currency}
                    </span>
                  </div>
                  <span className="text-sm">per year</span>
                </div>
              }
            />

            <p className="py-3 text-lg">{product.description}</p>
            <ul className="flex w-full flex-col gap-3 py-4">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="inline-block px-2">
                    <HiCheck />
                  </span>
                  {feature.name}
                </li>
              ))}
            </ul>

            <div className="mx-auto my-6 h-min w-min">
              <Button
                type="secondary"
                to="/signup"
                onClick={dispatch(updateStripePriceId(selectedPriceId))}
              >
                Signup
              </Button>
            </div>

            <div className="mx-auto my-6 h-min w-min">
              <Button type="secondary" onClick={handleSignUp}>
                SIGNUP WITH AUTH0
              </Button>
            </div>

            <div className="w-full border-t border-gray-200 py-6">
              <p className="inline-block px-4">Already have an account?</p>
              <div className="inline-block h-min w-max">
                <Button to="/login" type="secondary">
                  Login here
                </Button>
              </div>
            </div>

            <div className="w-full border-t border-gray-200 py-6">
              <div className="inline-block h-min w-max">
                <Button onClick={handleLogin} type="secondary">
                  AUTH0 LOGIN HERE
                </Button>
              </div>
            </div>
          </main>
        );
      })}
    </div>
  );
}

export default Home;

export const loader = async () => {
  const { data } = await getSubscriptionProducts();

  return data;
};
