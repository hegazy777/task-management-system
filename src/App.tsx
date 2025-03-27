import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import ForgetPass from "./modules/Authentcations/ForgetPass/ForgetPass";
import ChangePass from "./modules/Authentcations/ChangePass/ChangePass";
import VerifyAccount from "./modules/Authentcations/VerifyAccount/VerifyAccount";
import Register from "./modules/Authentcations/Register/Register";
import NotFound from "./modules/NotFound/NotFound";
import Login from "./modules/Authentcations/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "changePass", element: <ChangePass /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
