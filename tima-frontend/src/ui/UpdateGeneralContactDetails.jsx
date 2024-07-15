import Input from './Input';

function UpdateGeneralContactDetails({ type }) {
  const capitalised = type.charAt(0).toUpperCase() + type.slice(1);
  const name = type.includes('radio') ? type.split(' ')[1] : type;

  return (
    <div className="mb-6 mt-[-1rem]">
      <div className="flex flex-col gap-5 px-3">
        {/* NAME */}
        <div>
          <Input
            name={`${name}Name`}
            type="text"
            placeholder={`Type ${type}'s new name`}
            labelPosition="left"
            width="w-[22vw]"
          >
            {`${capitalised} name:`}
          </Input>
        </div>

        {/* WEBSITE */}
        <div>
          <Input
            name="website"
            type="text"
            placeholder={`Type ${type}'s new website`}
            labelPosition="left"
            width="w-[22vw]"
          >
            {`${capitalised} website:`}
          </Input>
        </div>

        {/* PHONE */}
        <div>
          <Input
            name={`${name}Ph`}
            type="text"
            placeholder={`Type ${type}'s new phone number`}
            labelPosition="left"
            width="w-[22vw]"
          >
            {`${capitalised} phone number:`}
          </Input>
        </div>

        {/* EMAIL */}
        <div>
          <Input
            name={`${name}Email`}
            type="text"
            placeholder={`Type ${type}'s new email address`}
            labelPosition="left"
            width="w-[22vw]"
          >
            {`${capitalised} email address:`}
          </Input>
        </div>
      </div>
    </div>
  );
}

export default UpdateGeneralContactDetails;
