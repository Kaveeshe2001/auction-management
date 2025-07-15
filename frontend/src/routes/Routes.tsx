import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Categories from "../pages/Categories/Categories";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            { path: 'categories', element: <Categories /> },
        ]
    }
])