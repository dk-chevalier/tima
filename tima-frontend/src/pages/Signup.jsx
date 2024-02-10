import NavList from '../ui/NavList';
import { useState } from 'react';
import Button from '../ui/Button';
import CreateAccount from '../features/signup/CreateAccount';
import PaymentInfo from '../features/signup/PaymentInfo';

function Signup() {
  const [signupStage, setSignupStage] = useState(1);

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-2 bg-primary-900">
      <NavList type="main">
        <Button
          type={signupStage === 1 ? 'roundActive' : 'round'}
          onClick={() => {
            return signupStage === 1 ? '' : setSignupStage(1);
          }}
        >
          1
        </Button>
        <Button
          type={signupStage === 2 ? 'roundActive' : 'round'}
          onClick={() => {
            return signupStage === 2 ? '' : setSignupStage(2);
          }}
        >
          2
        </Button>
      </NavList>
      <main className="relative h-96 w-96 rounded-md border border-secondary-300 bg-primary-100 p-8">
        {signupStage === 1 && <CreateAccount />}

        {signupStage === 2 && <PaymentInfo />}
      </main>
    </div>
  );
}

export default Signup;
