import React from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <div className="flex justify-center">
          <img className="h-24 w-24 rounded-full object-cover" src={import.meta.env.VITE_APP_URL + user?.profileImage} alt="User Profile" />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold"> Welcome {user?.userName}</h1>
          <p className="text-sm text-gray-600">Name - {user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-gray-500">Enroll. No.- {user?.enrollmentNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
