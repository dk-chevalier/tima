import NavList from '../ui/NavList';
import { useState } from 'react';
import Button from '../ui/Button';
import CreateAccount from './CreateAccount';
import PaymentInfo from './PaymentInfo';
import { Outlet } from 'react-router-dom';
import StyledNavLink from '../ui/StyledNavLink';
import { getSubscriptionProducts } from '../services/apiSubscriptions';

function Signup() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-2 bg-primary-900">
      <NavList type="main">
        <StyledNavLink type="round" to="create-account">
          1
        </StyledNavLink>
        <StyledNavLink type="round" to="payment-info">
          2
        </StyledNavLink>
      </NavList>
      <main className="relative h-[30rem] w-[30rem] rounded-md border border-secondary-300 bg-primary-100 p-8">
        <Outlet />
        {/* {signupStage === 1 && <CreateAccount />}

        {signupStage === 2 && <PaymentInfo />} */}
      </main>
    </div>
  );
}

export default Signup;

export const loader = async () => {
  const { data } = await getSubscriptionProducts();

  return data;
};
