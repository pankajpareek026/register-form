import React, { useState } from 'react';
import validator from 'validator';

const EmailInput = ({ label, fieldName, value, setMail, isDisabled, placeholder, isError }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleMailChange = (e) => {
        const email = e.target.value;

        setMail((current) => ({ ...current, [fieldName]: email }));

        if (!validator.isEmail(email)) {
            setError(true);
            setErrorMessage('Invalid email address');
        } else {
            setError(false); // Reset error state if email is valid
            setErrorMessage('');
        }
    };

    return (
        <div className="ml-auto mr-auto grid w-[90%] p-0">
            <label className="p-0 font-semibold" htmlFor={fieldName}>{label}</label>
            <input
                type="text"
                id={fieldName}
                disabled={isDisabled}
                placeholder={placeholder}
                onChange={handleMailChange}
                value={value}
                className={`border ${isError || error ? 'border-red-500' : 'border-black'} w-full rounded-lg h-12 pl-2`}
            />
            {(isError || error) && <span className="text-red-500 text-sm">{errorMessage || isError}</span>}
        </div>
    );
};

export default EmailInput;
