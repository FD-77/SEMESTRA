import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Main from "../pages/main/Main";
import Classes from "../pages/classes/Classes";
import ClassDetail from "../pages/classDetail/ClassDetail";
import GPACalculator from "../pages/gpaCalculator/GPACalculator";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/signUp/SignUp";

// Protected Route component
const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return element;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<Main />} />,
            },
            {
                path: "/classes",
                element: <ProtectedRoute element={<Classes />} />,
            },
            {
                path: "/classes/:id",
                element: <ProtectedRoute element={<ClassDetail />} />,
            },
            {
                path: "/gpaCalculator",
                element: <ProtectedRoute element={<GPACalculator />} />,
            },
            {
                path: "/profile",
                element: <ProtectedRoute element={<Profile />} />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
