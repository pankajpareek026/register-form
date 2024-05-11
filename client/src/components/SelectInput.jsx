import React from 'react';
import SelectOption from './SelectOption';

const SelectInput = ({ label, isDisabled, isError, DefaultValue, onChange, defaultData, id, name, value, options, onSelect, onClick }) => {
  return (
    <>
      <div className=" text-left w-[90%] ml-auto mr-auto p-1 flex justify-around items-center"> {/* Centering horizontally */}
        <label htmlFor={id} className="w-[40%] font-semibold mr-auto text-right pr-2">{label}</label> {/* Adjusted label width */}
        <select
          id={id}
          onClick={onClick}
          onSelect={onSelect}
          value={value}
          name={name}
          className={`border ${isError ? 'border-red-500' : 'border-black'} border-1 bg-gray-200 p-1 w-[60%] rounded-lg h-12`}
          onChange={onChange}
          disabled={isDisabled}
        >
          {options.length > 0 ? (
            options.map((option, index) => ( // Added unique key prop for each option
              <SelectOption key={index} data={option.name} value={option.id} />
            ))
          ) : (
            <SelectOption value={DefaultValue} data={defaultData} />
          )}
        </select>

      </div>
      {isError && <span className='text-red-500 ml-40 mr-2 w-[90%] text-sm text-right ' >{isError}</span>}
    </>
  );
};

export default SelectInput;
