import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main/Main";
import Classes from "../pages/classes/Classes";
import ClassDetail from "../pages/classDetail/ClassDetail";
import GPACalculator from "../pages/gpaCalculator/GPACalculator";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/signUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/classes",
                element: <Classes />,
            },
            {
                path: "/classes/:id",  // Add this route for class details
                element: <ClassDetail />,
            },
            {
                path: "/gpaCalculator",
                element: <GPACalculator />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/profile",
                element: <Profile />,
            }
        ],
    },
]);

export default router;
