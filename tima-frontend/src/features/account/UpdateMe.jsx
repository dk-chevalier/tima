import { Form } from 'react-router-dom';
import Button from '../../ui/Button';
import Toggle from '../../ui/Toggle';
import { useState } from 'react';
import GenresSelection from '../../ui/GenresSelection';
import Input from '../../ui/Input';

function UpdateMe() {
  const [updateMyGenres, setUpdateMyGenres] = useState(false);
  return (
    <div className="h-[70vh] w-[40vw] overflow-y-scroll">
      <h2 className="w-[40vw] bg-primary-100 p-3 text-2xl font-thin">
        Update your details
      </h2>
      <Form method="post" className="flex h-full w-full flex-col gap-8">
        {/* NAME */}
        <div>
          <Input
            name="name"
            type="text"
            placeholder="Type your new name"
            labelPosition="left"
            width="w-[22vw]"
          >
            Your name:
          </Input>
        </div>

        {/* EMAIL */}
        <div>
          <Input
            name="email"
            type="text"
            placeholder="Type your new email address"
            labelPosition="left"
            width="w-[22vw]"
          >
            Your email address:
          </Input>
        </div>

        {/* ARTIST NAME */}
        <div>
          <Input
            name="artistName"
            type="text"
            placeholder="Type your new artist name"
            labelPosition="left"
            width="w-[22vw]"
          >
            Your artist/band name:
          </Input>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateMyGenres ? '' : 'text-gray-400'
              }`}
            >
              Update your genres:
            </h3>
            <Toggle
              type="round"
              onChange={() => setUpdateMyGenres(!updateMyGenres)}
            />
          </div>
          {updateMyGenres && <GenresSelection numberCols="3" />}
          <div className="w-max self-center">
            <Button
              type="submit"
              name="updateOptions"
              value="updateMe updateMe"
            >
              Submit updates
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default UpdateMe;
