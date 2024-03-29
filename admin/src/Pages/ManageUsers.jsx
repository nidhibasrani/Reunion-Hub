import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      if (res.status === 200) {
        const data = res.data;
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`/admin/delete-user/${id}`);
      if (res.status === 200) {
        toast.success("User Deleted !", {
          position: "top-center"
        });
        fetchUsers();
      }
    } catch (error) {
      toast.error(`Some Error Occured`, {
        position: "top-left"
      });
      console.log(error);
    }
  };

  return (
    <>

      {users.length > 0 ? (<>
        <div className="text-center text-2xl font-bold mb-4 montserrat">Manage Users</div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img className="h-25 w-25 rounded-full" src={import.meta.env.VITE_APP_URL + user.profileImage} alt={`Avatar of ${user.userName}`} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 ">{user.userName}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900 text-2xl"><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></>) : (<>   <div className="text-center text-2xl font-bold mb-4 montserrat">No users found</div></>)}
      <ToastContainer autoClose={2000} />

    </>
  );
};

export default ManageUsers;
