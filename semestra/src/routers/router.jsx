import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main/Main.jsx";
import Classes from "../pages/classes/Classes.jsx";
import ClassDetail from "../pages/classDetail/ClassDetail.jsx";
import GPACalculator from "../pages/gpaCalculator/GPACalculator.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/signUp/SignUp.jsx";

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
                path: "/classes/:id",
                element: <ClassDetail />,
            },
            {
                path: "/gpaCalculator",
                element: <GPACalculator />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
