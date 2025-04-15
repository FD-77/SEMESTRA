import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../pages/main/Main.jsx";
import Classes from "../pages/classes/Classes.jsx";
import GPACalculator from "../pages/gpaCalculator/GPACalculator.jsx";
import Profile from "../pages/profile/Profile.jsx";

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
                path: "/gpaCalculator",
                element: <GPACalculator />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
]);

export default router;
