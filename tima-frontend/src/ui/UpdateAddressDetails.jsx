import Input from './Input';

function UpdateAddressDetails({ type }) {
  return (
    <div className="mb-6 mt-[-1rem]">
      <div className="flex flex-col gap-2 px-3">
        {/* Street */}
        <div>
          <Input
            name="street"
            type="text"
            placeholder={`Type ${type}'s new street address`}
            labelPosition="above"
            width="w-full"
          >
            Street:
          </Input>
        </div>

        <div className="flex justify-between gap-3">
          {/* City */}
          <div className="w-1/2">
            <Input
              name="city"
              type="text"
              placeholder={`Type ${type}'s new city`}
              labelPosition="above"
              width="w-full"
            >
              City:
            </Input>
          </div>

          {/* State */}
          <div className="w-1/2">
            <Input
              name="state"
              type="text"
              placeholder={`Type ${type}'s new state`}
              labelPosition="above"
              width="w-full"
            >
              State:
            </Input>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          {/* Country */}
          <div className="w-1/2">
            <Input
              name="country"
              type="text"
              placeholder={`Type ${type}'s new country`}
              labelPosition="above"
              width="w-full"
            >
              Country:
            </Input>
          </div>

          {/* Postcode */}
          <div className="w-1/2">
            <Input
              name="postcode"
              type="text"
              placeholder={`Type ${type}'s new postcode`}
              labelPosition="above"
              width="w-full"
            >
              Postcode:
            </Input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAddressDetails;
