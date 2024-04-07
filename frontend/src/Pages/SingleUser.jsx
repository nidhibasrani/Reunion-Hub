import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams, useNavigate } from "react-router-dom";



const SingleUser = () => {
  const { userId } = useParams();
  const navigate  = useNavigate();  

  const [user, setUser] = useState(null);

  const fetchSingleUser = async () => {
    try {
      const response = await axios.get(`/user/user/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


   const handleChatClick =  async () =>{
    try {
        const res = await axios.post('/chat/conversation',{receiver : user?._id} )
        if(res.status === 201){
            navigate('/my-chats')
        }
    } catch (error) {
        console.log(error); 
    }

   }


  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={import.meta.env.VITE_APP_URL + user?.profileImage} alt={user?.userName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{user?.userName}</div>
        <p className="text-gray-700 text-base">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="px-6 py-4">
        <button onClick={handleChatClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Chat
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
