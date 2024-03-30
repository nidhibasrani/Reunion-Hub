import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { image } from "../../helper/";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/features/AuthSlice";
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

  return (
    <div className="bg-[#001524] px-5 md:px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="text-white">
          {/* Your logo or any other content */}
          <img src={image.logo} width={200} height={200} alt="Logo" />
        </div>
        <div className="md:hidden relative w-full">
          {/* Hamburger icon for mobile */}
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? "Close" : "Menu"}
          </button>
          {/* Menu items */}
          <ul className={`absolute left-0 top-full bg-[#001524] w-full ${isOpen ? "block" : "hidden"} md:hidden text-white`}>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/events" onClick={toggleMenu}>Events</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/register" onClick={toggleMenu}>Register</Link>
              </li>
            )}
            <li>
              <Link to="/contact" onClick={toggleMenu}>Contact us</Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>About us</Link>
            </li>
            <li>
              <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
            </li>
            <li>
              <Link to="/faq" onClick={toggleMenu}>FAQ'S</Link>
            </li>
          </ul>
        </div>
        <ul className="hidden md:flex flex-wrap gap-5 text-white justify-center md:justify-start items-center">
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/events" onClick={toggleMenu}>Events</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>Contact us</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>About us</Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
          </li>
          <li>
            <Link to="/faq" onClick={toggleMenu}>FAQ'S</Link>
          </li>
          {isAuthenticated ? (
            <li className="z-10">
              <Menu>
                <MenuButton as={Button}>
                  <img src={import.meta.env.VITE_APP_URL + user?.profileImage} width={40} className="rounded-full" alt="" />
                </MenuButton>
                <MenuList className="bg-[#001524] p-4 rounded-xl border border-white ">
                  <MenuItem><Link to='/user-dashboard'>Dashboard</Link></MenuItem>
                  <MenuItem><Link to='/user-dashboard'>My Chats</Link></MenuItem>
                  <MenuItem><Link to='/my-events'>My Events</Link></MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>

                </MenuList>
              </Menu>
            </li>

          ) : (<>
            <li>
              <Link to="/register" onClick={toggleMenu}><button className="px-4 py-2 bg-blue-700 rounded-sm">Register</button></Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleMenu}><button className="px-4 py-2 bg-blue-700 rounded-sm  ">Login</button></Link>
            </li>
            </>)}

        </ul>
      </div>
    </div>
  );
};

export default Header;
