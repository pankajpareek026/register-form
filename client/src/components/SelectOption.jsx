import React from 'react'

const SelectOption = ({ data = "select", value = "select" }) => {
    return (
        <>
            <option className='text-black' value={value}>{data}</option>
        </>
    )
}

export default SelectOption