import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  Button,
  RadioGroup,
  Stack,
  Radio
} from '@chakra-ui/react'
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <Button ref={btnRef} colorScheme='orange' onClick={onOpen}>
        <RxHamburgerMenu />

      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg={'#dd6b20'}>Menu</DrawerHeader>

          <DrawerBody bg={'#001524'}>
            <ul className='text-white flex flex-col gap-2 py-2'>
              <Link onClick={onClose} to='/' > <li>Home</li></Link>
              <Link onClick={onClose} to='/events' > <li>Events</li></Link>
              <Link onClick={onClose} to='/contact' > <li>Contact Us</li></Link>
              <Link onClick={onClose} to='/about' > <li>About Us</li></Link>
              <Link onClick={onClose} to='/gallery' >  <li>Gallery</li></Link>
              <Link onClick={onClose} to='/faq' > <li>Faq's</li></Link>
              {isAuthenticated ? (<>
                <Link to='/user-dashboard'>Dashboard</Link>
                <Link to='/my-chats'>My Chats</Link>
                <Link to='/my-events'>My Events</Link>
              </>) : (<>
                <li>
                  <Link to="/register"><button onClick={onClose} className="px-4 py-2 bg-[#dd6b20] rounded-sm">Register</button></Link>
                </li>
                <li>
                  <Link to="/login" ><button onClick={onClose} className="px-4 py-2 bg-[#dd6b20] rounded-sm  ">Login</button></Link>
                </li>
              </>)}

            </ul>
          </DrawerBody>
          {/* 
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer >
    </>
  )
}

export default MenuSidebar