import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/features/AuthSlice'; // Import the updateUserProfile action

const UserDashboard = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedUserName, setEditedUserName] = useState(user?.userName); // Initialize with user's username

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEditedUserName(value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const editedUser = { ...user, userName: editedUserName };
      
      dispatch(updateUserProfile(editedUser));
      setEditMode(false); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <div className="flex justify-center">
          <img className="h-24 w-24 rounded-full object-cover" src={import.meta.env.VITE_APP_URL + user?.profileImage} alt="User Profile" />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold"> Welcome {user?.userName}</h1>
          {editMode ? (
            <div>
              <input type="text" value={editedUserName} defaultValue={user.userName} onChange={handleInputChange} placeholder="Set New User Name" />
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600">Name - {user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500">Enroll. No.- {user?.enrollmentNumber}</p>
            </div>
          )}
          {editMode ? (
            <button onClick={handleSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Save</button>
          ) : (
            <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
