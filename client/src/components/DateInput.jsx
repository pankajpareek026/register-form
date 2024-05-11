import React, { useState } from 'react';
import validator from 'validator';

const DateInput = ({ label, isDisabled, fieldName, value, setDate, isError, placeHolder }) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleDateChange = (e) => {

        const date = e.target.value
        if (!date.trim()) {
            setError(true)
            setErrorMessage("Date Of Birth is Required")
        }
        if (!validator.isDate(e.target.value)) {
            setError(true)
            setErrorMessage("Invldi Date Of Birth")
        }
        console.log("date=>", date);
        setDate((current) => ({ ...current, [fieldName]: date }))
        setError(false)
    };

    return (
        <div className="p-1 ml-auto mr-auto grid w-[90%]">
            {/* <div className='mr-auto ml-auto'> */}
            <label className='p-1 font-semibold' htmlFor="">{label}</label>
            <input
                type="date"
                value={value}
                onChange={handleDateChange}
                disabled={isDisabled}
                placeholder={placeHolder}
                className={`border ${error || isError ? 'border-red-500' : 'border-black'}  w-full rounded-lg h-12 pl-2`}
            />
            {/* </div> */}
            {error || isError && <p className='text-red-500 text-sm'>{errorMessage || isError}</p>}
        </div>
    );
};

export default DateInput;
