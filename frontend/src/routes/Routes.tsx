import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Categories from "../pages/Categories/Categories";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'categories', element: <Categories /> },
        ]
    }
])