import { Form } from 'react-router-dom';
import Button from '../../ui/Button';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCAL_URL;

function CreateAccount() {
  return (
    <Form method="post">
      <div>
        <label>Full name:</label>
        <input type="text" name="name" />
      </div>

      <div>
        <label>Email address:</label>
        <input type="email" name="email" />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>

      <div>
        <label>Confirm password:</label>
        <input type="password" name="passwordConfirm" />
      </div>

      <Button type="submit">Next</Button>

      {/*
      PROBABLY DON'T NEED THESE UNTIL AFTER THEY HAVE SIGNED UP....CAN PUT THEM IN ACCOUNT SECTION, MAKING SIGNUP EASIER/QUICKER

      <div>
        <label>Artist/band name:</label>
        <input type="text" />
      </div>

      <div>
        <label>Select all genres that apply to your music:</label>
        <select
          className="rounded-sm border border-secondary-300 bg-primary-100 shadow-md"
          name="genres"
          multiple
        >
          <option value="acoustic">Acoustic</option>
          <option value="blues">Blues</option>
          <option value="classical">Classical</option>
          <option value="country">Country</option>
          <option value="disco">Disco</option>
          <option value="electronic">Electronic</option>
          <option value="folk">Folk</option>
          <option value="funk">Funk</option>
          <option value="hip-hop">Hip-hop</option>
          <option value="indie">Indie</option>
          <option value="jazz">Jazz</option>
          <option value="latin">Latin</option>
          <option value="metal">Metal</option>
          <option value="pop">Pop</option>
          <option value="punk">Punk</option>
          <option value="r&b">R&B</option>
          <option value="reggae">Reggae</option>
          <option value="rock">Rock</option>
          <option value="singer-songwriter">Singer-songrwriter</option>
          <option value="soul">Soul</option>
        </select> 
      </div>
        */}
    </Form>
  );
}

export default CreateAccount;

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  try {
    const res = await axios.post(`${URL}/api/v1/users/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    });

    console.log(res);
  } catch (err) {
    console.error(err);
  }

  return formData;
}
