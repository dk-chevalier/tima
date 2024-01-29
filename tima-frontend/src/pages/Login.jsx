import { Form, redirect } from 'react-router-dom';
import Button from '../ui/Button';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

function Login() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-primary-900">
      <main className="relative h-96 w-96 rounded-md border border-secondary-300 bg-primary-100 p-8">
        <Form method="post">
          <div className="relative">
            <h1 className="mb-1 p-4 text-3xl font-thin">Login</h1>
            <div className="mb-2 flex h-full w-full flex-col items-center justify-between gap-8">
              <div className="flex flex-col">
                <label className="">Email address:</label>
                <input
                  className="rounded-sm border border-secondary-300 shadow-md"
                  type="text"
                  name="email"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="flex flex-col">
                <label>Password:</label>
                <input
                  className="rounded-sm border border-secondary-300 shadow-md"
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </div>
            </div>
            <div className="absolute right-6 p-4">
              <Button type="submit">Login</Button>
            </div>
          </div>
        </Form>
      </main>
    </div>
  );
}

export default Login;

export const action = async ({ request, params }) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const email = formData.get('email');
      const password = formData.get('password');
      try {
        // const res = await fetch(`${URL}/api/v1/users/login`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // });

        const res = await axios.post(
          `${URL}/api/v1/users/login`,
          { email, password },
          { withCredentials: true },
        );

        if (res.data.status === 'success') {
          alert('Logged In Successfully');
          return redirect('/app/map/venues');
        }
        if (!res.data.status === 'success') {
          alert('Could not log you in, please try again');
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  return null;
};
