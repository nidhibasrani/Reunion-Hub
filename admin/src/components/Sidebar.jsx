import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../public/reunion-hub-logo.png'

const Sidebar = () => {
  return (
    <> 
    <div className="Sidebar py-10 px-3 montserrat"><img src={logo} width={200} alt="" /></div>
    <ul className='px-5 montserrat flex flex-col gap-2 text-white '>
        <li className=''><Link to='/manage-users'>Manage Users</Link></li>
        <li className=''><Link to='/manage-events'>Manage Events</Link></li>
 
    </ul>
    </>
  )
}

export default Sidebar