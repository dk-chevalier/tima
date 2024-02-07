import { useLoaderData } from 'react-router-dom';
import { getSubscriptionProducts } from '../services/apiSubscriptions';

function Home() {
  const { products, prices } = useLoaderData();
  console.log(products);
  console.log(prices);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-primary-900">
      {products.data.map((product) => {
        return (
          <main
            className="relative h-96 w-96 rounded-md border border-secondary-300 bg-primary-100 p-8"
            key={product.id}
          >
            <h1 className="text-center text-3xl font-thin">
              {product.name} Plan
            </h1>
            <p>Prices:</p>
            <p>
              {prices.data
                .filter((price) => price.product === product.id)
                .map((price) => (
                  <p key={price.nickname}>
                    ${price.unit_amount / 100}
                    <span className="text-xs opacity-50">{price.currency}</span>
                    /{price.recurring.interval}
                  </p>
                ))}
            </p>
          </main>
        );
      })}
    </div>
  );
}

export default Home;

export const loader = (queryClient) => async () => {
  const { data } = await getSubscriptionProducts();

  // console.log(data);
  const { products, prices } = data;

  // console.log(products);
  // console.log(prices);

  return data;
  // return null;
};
