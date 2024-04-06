import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Register from './Pages/Register'
import PrivateCheck from './components/PrivateCheck'
import UserDashboard from './Pages/UserDashboard'
import Event from './Pages/Event'
import SingleEvent from './Pages/SingleEvent'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/AuthSlice'
import MyEvents from './Pages/MyEvents'

import Chat from './Pages/Chat'
import Contact from './Pages/Contact'
import About from './Pages/About'

function App() {


  let { id } = useParams();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe());
    }

    
  }, [isAuthenticated]);



  return (
    <>

      <Routes>


        {/* Private Routes */}
        <Route element={<PrivateCheck />}>
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/my-events' element={<MyEvents />} />
          <Route path='/my-chats' element={<Chat />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<Event />} />
        <Route path={`/event/:id`} element={<SingleEvent />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/about-us' element={<About />} />
        <Route path='*' element={<NotFound />} />



      </Routes>

    </>
  )
}

export default App
