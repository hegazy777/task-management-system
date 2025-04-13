import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/AuthLayout/AuthLayout";
import ForgetPassword from "./modules/Authentcations/ForgotPassword/ForgotPassword";
import ChangePassword from "./modules/Authentcations/ChangePassword/ChangePassword";
import VerifyAccount from "./modules/Authentcations/VerifyAccount/VerifyAccount";
import Register from "./modules/Authentcations/Register/Register";
import NotFound from "./modules/NotFound/NotFound";
import Login from "./modules/Authentcations/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import Dashboard from "./modules/Dashboard/Dashboard";
import ProtectedRoute from "./modules/Shared/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/Shared/MasterLayout/MasterLayout";
import ResetPassword from "./modules/Authentcations/ResetPassword/ResetPassword";

import "react-toastify/dist/ReactToastify.css";

import Tasks from "./modules/Tasks/Tasks";
import AllTasks from "./modules/AllTasks/AllTasks";

import ProjectsList from "./modules/Projects/ProjectsList/ProjectsList";
import ProjectData from "./modules/Projects/ProjectData/ProjectData";

import UserLIst from "./modules/UserLIst/UserLIst";

import TaskBoard from "./modules/TaskBoard/TaskBoard";

import '../src/modules/Shared/DarkMode/DarkMode.css';
import TaskData from "./modules/TaskData/TaskData";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },

    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "new-task", element: <Tasks /> },
        { path: "all-tasks", element: <AllTasks /> },
        {
          index: true,
          element: <Dashboard />,
        },
        { path: "projects", element: <ProjectsList /> },
        {
          path: "projects/new",
          element: <ProjectData />,
        },
        {
          path: "projects/:id/edit",
          element: <ProjectData />,
        },
        {
          path: "users",
          element: <UserLIst />,
        },
        {
          path: "all-tasks/:id/edit",
          element: <TaskData />,
        },
        {
          path: "TaskBoard",
          element: <TaskBoard />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
