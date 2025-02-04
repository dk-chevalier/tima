import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import Toggle from '../../../ui/Toggle';
import Button from '../../../ui/Button';
import GenresSelection from '../../../ui/GenresSelection';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import CustomToast from '../../../ui/CustomToast';
import Input from '../../../ui/Input';
import UpdateAddressDetails from '../../../ui/UpdateAddressDetails';
import UpdateGeneralContactDetails from '../../../ui/UpdateGeneralContactDetails';

const URL = import.meta.env.VITE_LOCAL_URL;

function SuggestRadioStationUpdates({ stationId, onCloseModal, requestType }) {
  const [updateStationContactDetails, setUpdateStationContactDetails] =
    useState(false);
  const [updateAddressDetails, setUpdateAddressDetails] = useState(false);
  const [updateMusicSubmissionDetails, setUpdateMusicSubmissionDetails] =
    useState(false);
  const [updateExtraDetails, setUpdateExtraDetails] = useState(false);

  return (
    <div className="h-[70vh] w-[40vw] overflow-y-scroll">
      <h2 className="w-[40vw] bg-primary-100 p-3 text-2xl font-thin">
        Suggest updates to radio station information
      </h2>
      <Form method="post">
        <div className="mt-16 flex flex-col gap-6">
          {/* STATION GENERAL CONTACT DETAILS */}
          {/* section title and toggle on/off button */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateStationContactDetails ? '' : 'text-gray-400'
              }`}
            >
              Update radio station contact details:
            </h3>
            <Toggle
              type="round"
              onChange={() =>
                setUpdateStationContactDetails(!updateStationContactDetails)
              }
            />
          </div>
          {/* update general contact details form shows if toggled on */}
          {updateStationContactDetails && (
            <UpdateGeneralContactDetails type="radio station" />
          )}

          {/* STATION ADDRESS */}
          {/* section title and toggle on/off button */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateAddressDetails ? '' : 'text-gray-400'
              }`}
            >
              Update address details:
            </h3>
            <Toggle
              type="round"
              onChange={() => setUpdateAddressDetails(!updateAddressDetails)}
            />
          </div>
          {/* update address form shows if toggled on */}
          {updateAddressDetails && (
            <UpdateAddressDetails type="radio station" />
          )}

          {/* MUSIC SUBMISSION / INTERVIEW REQUEST DETAILS */}
          {/* section title and toggle on/off button */}
          <div className="flex justify-between">
            <h3
              className={`mb-2 inline font-semibold ${
                updateMusicSubmissionDetails ? '' : 'text-gray-400'
              }`}
            >
              Update music submission/interview request contact details:
            </h3>
            <Toggle
              type="round"
              onChange={() =>
                setUpdateMusicSubmissionDetails(!updateMusicSubmissionDetails)
              }
            />
          </div>
          {/* music submission and interview request forms both show
          if toggled on */}
          {updateMusicSubmissionDetails && (
            <>
              {/* MUSIC SUBMISSIONS DETAILS */}
              <div className="mb-6 mt-[-1rem]">
                <h3 className="mb-4 text-center font-semibold text-secondary-600">
                  Music Submissions Details
                </h3>
                <div className="flex flex-col gap-5 px-3">
                  {/* MUSIC SUBMISSIONS CONTACT NAME */}
                  <div>
                    <Input
                      name="musicSubmissionsName"
                      type="text"
                      placeholder="Type name of new submissions contact"
                      labelPosition="left"
                      width="w-[22vw]"
                    >
                      Name of submissions contact:
                    </Input>
                  </div>

                  {/* MUSIC SUBMISSIONS EMAIL */}
                  <div>
                    <Input
                      name="musicSubmissionsEmail"
                      type="text"
                      placeholder="Type new submissions email"
                      labelPosition="left"
                      width="w-[22vw]"
                    >
                      Submissions email:
                    </Input>
                  </div>
                </div>
              </div>

              {/* INTERVIEW REQUEST DETAILS */}
              <div className="mb-6 mt-[-1rem]">
                <h3 className="mb-4 text-center font-semibold text-secondary-600">
                  Interview Request Details
                </h3>
                <div className="flex flex-col gap-5 px-3">
                  {/* INTERVIEW REQUESTS CONTACT NAME */}
                  <div>
                    <Input
                      name="interviewRequestsName"
                      type="text"
                      placeholder="Type name of new interviews contact"
                      labelPosition="left"
                      width="w-[22vw]"
                    >
                      Name of interviews contact:
                    </Input>
                  </div>

                  {/* INTERVIEW REQUESTS EMAIL */}
                  <div>
                    <Input
                      name="interviewRequestsEmail"
                      type="text"
                      placeholder="Type new interview requests email"
                      labelPosition="left"
                      width="w-[22vw]"
                    >
                      Interview requests email:
                    </Input>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="w-max self-center">
            <Button
              type="submit"
              name="updateOptions"
              // value can later be .split() so we have 2 values to inform our
              // suggestUpdatesAction on how to handle the data
              value={`${requestType} radioStationUpdates`}
            >
              Submit updates
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SuggestRadioStationUpdates;
