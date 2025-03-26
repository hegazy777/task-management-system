
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shard/AuthLayout/AuthLayout'
import ForgetPass from './modules/Authentcations/ForgetPass/ForgetPass'
import ChangePass from './modules/Authentcations/ChangePass/ChangePass'
import VerifyAccount from './modules/Authentcations/VerifyAccount/VerifyAccount'
import Register from './modules/Authentcations/Register/Register'
import NotFound from './modules/NotFound/NotFound'
import Login from './modules/Authentcations/Login/Login'




function App() {





  const router = createBrowserRouter([
    {
      path:'',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetPass', element: <ForgetPass/> },
        { path: 'changePass', element: <ChangePass /> },
        { path: 'verifyAccount', element: <VerifyAccount /> }
      ]
    },
   
    {
      path: '*',  
      element: <NotFound />
    }
  ])

  return (
    <>
     
      <RouterProvider router={router} ></RouterProvider>
    </>
  
  )
  
}

export default App
