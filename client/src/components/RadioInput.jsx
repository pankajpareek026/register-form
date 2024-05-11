import React, { useState } from 'react';

const RadioInput = ({ label, value, fieldName, fieldValue, setGender, name }) => {
  const [genderError, setGenderError] = useState(null);
  const handleRadioChange = (e) => {
    console.log("value=>", e.target.value)
    setGender((current) => ({ ...current, [fieldName]: fieldValue }))
  }
  return (
    <div>

      <label className='flex gap-2' >
        <input
          type="radio"
          value={value}
          checked={fieldValue === value}
          onChange={handleRadioChange}
          name={name}
          className={'p-10 border '}
        />
        {label}
      </label>

    </div>
  );
};

export default RadioInput;
