
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Login from './Pages/Login'
import { useSelector } from 'react-redux'
import Dashboard from './Pages/Dashboard'

import Sidebar from './components/Sidebar'
import ManageUsers from "./Pages/ManageUsers";
import Events from "./Pages/Events";



function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)




  const Layout = () => {
    return (
      <>
        <div className="flex h-screen">
          <div className="bg-black w-1/5">
            <Sidebar />
          </div>
          <div className="flex-1">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4 montserrat">Admin Dashboard</h1>
              <div className="bg-white p-6 rounded shadow">

                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/manage-users",
          element: <ManageUsers />
        },
        {
          path: "/manage-events",
          element: <Events />
        },
      ],



    },
    { 
      path: "/login",
      element: <Login />
    }


  ]);


  return <RouterProvider router={router} />

}

export default App
