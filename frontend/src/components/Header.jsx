import React, { useState } from "react";
import { Link } from "react-router-dom";
import { image } from "../../helper/";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#001524] px-5 md:px-10 py-5">
      <div className="flex justify-between items-center">
        <div className="text-white">
          {/* Your logo or any other content */}
          <img src={image.logo} width={200} height={200} alt="Logo" />
        </div>
        <div className="md:hidden relative w-full"> {/* Set width to full */}
          {/* Hamburger icon for mobile */}
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? "Close" : "Menu"}
          </button>
          {/* Menu items */}
          <ul
            className={`absolute left-0 top-full bg-[#001524] w-full ${
              isOpen ? "block" : "hidden"
            } md:hidden text-white`}
          >
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={toggleMenu}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={toggleMenu}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                About us
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={toggleMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={toggleMenu}>
                FAQ'S
              </Link>
            </li>
          </ul>
        </div>
        <ul className="hidden md:flex flex-wrap gap-5 text-white justify-center md:justify-start">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" onClick={toggleMenu}>
              Events
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={toggleMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact us
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={toggleMenu}>
              FAQ'S
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
