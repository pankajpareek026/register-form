import React from 'react'

const Button = ({ isDisabled, name, onClick }) => {
    return (
        <div className="p-1 w-[90%]">
            <button className=' mx-auto p-1 rounded-lg h-12 font-normal text-2xl ml-auto mr-auto w-full text-white  bg-blue-600' onClick={onClick} disabled={isDisabled} >{name}</button>
        </div>
    )
}

export default Button