import { useState } from 'react';
import Toggle from './Toggle';

function GigTypeSelection({ withToggle = false, children }) {
  const [updateGigType, setUpdateGigType] = useState(false);
  if (withToggle) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className={`${updateGigType ? '' : 'text-gray-400'}`}>
            {children}
          </h3>
          {updateGigType && (
            <div>
              <label>
                <select
                  className="rounded-md border border-secondary-300 px-2 py-1 shadow-md"
                  name="gigType"
                  defaultValue="both"
                >
                  <option value="both">Both</option>
                  <option value="ticketed">Ticketed</option>
                  <option value="free-entry">Free entry</option>
                </select>
              </label>
            </div>
          )}
        </div>
        <Toggle
          type="round"
          onChange={() => setUpdateGigType(!updateGigType)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h3>{children}</h3>

        <div>
          <label>
            <select
              className="rounded-md border border-secondary-300 px-2 py-1 shadow-md"
              name="gigType"
              defaultValue="both"
            >
              <option value="both">Both</option>
              <option value="ticketed">Ticketed</option>
              <option value="free-entry">Free entry</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default GigTypeSelection;
