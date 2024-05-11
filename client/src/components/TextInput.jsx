import React, { useState } from 'react';
import validator from 'validator';

const TextInput = ({ label, fieldName, value, isDisabled = false, placeholder, setText, isError }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Update state using functional update
    setText((current) => ({ ...current, [fieldName]: inputValue }));

    if (!validator.isAlpha(inputValue)) {
      setError(true);
      setErrorMessage(`Only alphabets are allowed`);
      return;
    }
    else {
      setError(false);
      setErrorMessage('');
    }
  };

  return (
    <div className="ml-auto mr-auto grid w-[90%] p-0">
      <label className="font-semibold" htmlFor={fieldName}>
        {label}
      </label>
      <input
        type="text"
        id={fieldName}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className={`${error || isError ? 'border-red-500' : 'border-black'} border border-1 w-full rounded-lg h-12 pl-2`}
      />
      {(error || isError) && <span className="text-red-500 text-sm">{errorMessage || isError}</span>}
    </div>
  );
};

export default TextInput;
