import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div className="loader an ease-in-out rounded-full border-4 border-t-16 border-gray-300 h-12 w-12 mb-4"></div>
        </div>
    );
};

export default Loading;
