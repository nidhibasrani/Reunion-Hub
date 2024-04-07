import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { image } from "../../helper/";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/features/AuthSlice";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import MenuSidebar from "./MenuSidebar";

import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');

  }

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  // console.log('user from redux', user)

  // drawer 

  const handleResetLocalStorage = () => {
    
    localStorage.removeItem('selectedConversationId');
  };

  return (
    <div className="bg-[#001524] px-5 md:px-10 py-5">

      <div className="flex justify-between items-center">
        <div className="text-white">

          <img src={image.logo} width={200} height={200} alt="Logo" />
        </div>
        <div className="md:hidden">
          <MenuSidebar />
        </div>
        <ul className="hidden md:flex flex-wrap gap-5 text-white justify-center md:justify-start items-center">
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/events" onClick={toggleMenu}>Events</Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={toggleMenu}>Contact us</Link>
          </li>
          <li>
            <Link to="/about-us" onClick={toggleMenu}>About us</Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
          </li>
          <li>
            <Link to="/faq" onClick={toggleMenu}>FAQ'S</Link>
          </li>
          {isAuthenticated ? (
            <li className="z-10">
              <Menu _hover={{ bg: '#001524' }} bg={'#001524'}>
                <MenuButton as={Button} background={'#001524'} _hover={{ bg: '#001524' }}>
                  <img src={import.meta.env.VITE_APP_URL + user?.profileImage} width={40} className="rounded-full" alt="" />
                </MenuButton>
                <MenuList _hover={{ bg: '#001524' }} bg={'#001524'} className="bg-[#001524] p-4 rounded-xl border border-white ">
                  <Link to='/user-dashboard'>    <MenuItem bg={'#001524'} _hover={{ bg: '#001524' }} icon={<RxDashboard size={16} />}>Dashboard</MenuItem></Link>
                  <Link onClick={handleResetLocalStorage} to='/my-chats'>  <MenuItem bg={'#001524'} _hover={{ bg: '#001524' }} icon={<BsChatSquareText size={16}  />}>My Chats</MenuItem></Link>
                  <Link to='/my-events'>  <MenuItem bg={'#001524'} _hover={{ bg: '#001524' }} icon={<MdOutlineEventAvailable size={16} />}>My Events</MenuItem></Link>
                  <MenuItem bg={'#001524'} _hover={{ bg: '#001524' }} icon={<IoIosLogOut size={16} />} onClick={handleLogout}>Logout</MenuItem>

                </MenuList>
              </Menu>
            </li>

          ) : (<>
            <li>
              <Link to="/register" onClick={toggleMenu}><button className="px-4 py-2 bg-[#dd6b20] rounded-sm">Register</button></Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleMenu}><button className="px-4 py-2 bg-[#dd6b20] rounded-sm  ">Login</button></Link>
            </li>
          </>)}

        </ul>
      </div>
    </div>
  );
};

export default Header;
