import React, { useState } from 'react';

const AgeInput = ({ label, isDisabled, isError, readOnly, fieldName, placeholder, setAge, dob, age }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const calculateAge = () => {

        if (!dob) {
            setError(true);
            setErrorMessage('Please select Date of Birth.');
            return;
        }

        const selectedDate = new Date(dob);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - selectedDate.getTime();

        console.log("dft =>", differenceInTime)
        const years = Math.floor(differenceInTime / (1000 * 3600 * 24 * 365)); // milliseconds in a year


        if (differenceInTime < 0) {
            setError(true)
            setErrorMessage("Date of birth cannot be grater than current date")
            return
        }

        if (isNaN(years) || years < 14 || years > 99) {
            setError(true);
            setErrorMessage('Age must be between 14 and 99 years ago.');
            return;
        }


        setError(false); // Reset error state if no error
        setAge((current) => ({ ...current, [fieldName]: years }));
    };

    return (
        <div className="ml-auto mr-auto grid w-[90%] p-1">
            <label className='p-1 font-semibold' htmlFor="">{label}</label>
            <input
                type="text"
                disabled={isDisabled}
                placeholder={placeholder}
                readOnly={readOnly}
                value={age || ''} // Set value to empty string if age is not set
                onClick={calculateAge}
                onBlur={calculateAge} // Calculate age when input loses focus
                className={`border ${error ? 'border-red-500' : 'border-black'} w-full rounded-lg h-12 pl-2`}
            />
            {(error || isError) && <span className='text-red-500 text-sm'>{errorMessage || isError}</span>}
        </div>
    );
};

export default AgeInput;
