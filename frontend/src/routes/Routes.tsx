import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Categories from "../pages/Categories/Categories";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import HowtoSell from "../pages/HowtoSell/HowtoSell";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'how-to-sell', element: <HowtoSell /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            { path: 'categories', element: <Categories /> },
        ]
    }
])