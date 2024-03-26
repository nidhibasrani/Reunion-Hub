import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 md:gap-20 justify-between bg-[#001524] w-full px-5 md:px-10 py-5 md:py-10">
        <div className="text-white">
          {/* Your logo or any other content */}
        </div>
        <ul className="flex flex-wrap gap-5 text-white justify-center md:justify-start">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/faq">FAQ'S</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Header;
