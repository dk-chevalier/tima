import { withAuthenticationRequired } from '@auth0/auth0-react';
import Spinner from '../ui/Spinner';

function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Spinner />,
  });

  return <Component />;
}

export default AuthenticationGuard;
