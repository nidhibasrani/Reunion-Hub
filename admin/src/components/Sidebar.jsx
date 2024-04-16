import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/reunion-hub-logo.png";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/AuthSlice";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { MdEvent, MdPeople, MdDelete } from "react-icons/md";

const Sidebar = () => {
  const navigat = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigat("/login");
  };

  return (
    <>
      <div className="Sidebar py-10 px-3 montserrat flex justify-between items-center">
        <img src={logo} width={140} alt="" />
        <CiLogout
          className="text-red-500 text-3xl cursor-pointer"
          onClick={logoutHandler}
        />
      </div>

      <ul className="px-5 montserrat flex flex-col gap-2 text-white ">
        <li className="flex items-center">
          <MdPeople className="mr-2" />
          <Link to="/manage-users">Manage Users</Link>
        </li>
      </ul>

      <Accordion allowToggle className="mt-5">
        <AccordionItem>
          <h2 className="text-white">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Manage Events
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="px-5 montserrat flex flex-col gap-3 text-white ">
              <li className="flex items-center">
                <MdEvent className="mr-2" />
                <Link to="/manage-events">Add Events</Link>
              </li>
              <li className="flex items-center">
                <MdDelete className="mr-2" />
                <Link to="/delete-event">Delete Events</Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2 className="text-white">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Website CMS
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="px-5 montserrat flex flex-col gap-3 text-white ">
              <li className="flex items-center">
                <MdEvent className="mr-2" />
                <Link to="/gallery">Add Gallery</Link>
              </li>
              <li className="flex items-center">
                <MdDelete className="mr-2" />
                <Link to="/manage-gallery">Manage Gallery</Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2 className="text-white">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Website Messages
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ul className="px-5 montserrat flex flex-col gap-3 text-white ">
              <li className="flex items-center">
                <MdEvent className="mr-2" />
                <Link to="/contact-messages">Contact Messages</Link>
              </li>
             
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Sidebar;
