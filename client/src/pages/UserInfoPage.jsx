import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserInfoPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const { userId } = useParams();

  useEffect(() => {

    setLoading(true);

    // fetch user data
    axios.get(`/api/info/${userId}`, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const { success, data } = response.data;
        if (success) {
          console.log("data: ", data)
          setUserData(data);
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-8 max-w-auto w-full">
        <h2 className="text-3xl font-normal mb-6 text-center text-blue-500">User Information</h2>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(userData).map(([key, value], index) => (
            <div key={index} className="flex flex-col">
              <span className="font-semibold text-black text-xl capitalize">
                {key === '_id' ? 'User Id' :
                  key === 'firstName' ? 'First Name' :
                    key === 'lastName' ? 'Last Name' :
                      key == "dob" ? "Date Of Birth" : key}
              </span>

              <span className="text-lg pr-1">
                {key === 'dob' ? new Date(value).toLocaleString() : value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Link to={'/'} className='text-blue-500 absolute top-12 font-semibold underline'>New Registration</Link>
    </div>
  );
};

export default UserInfoPage;
