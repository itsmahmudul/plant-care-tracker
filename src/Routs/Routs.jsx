import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Error from "../Components/Pages/Error";
import Home from "../Components/Pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        errorElement:<Error></Error>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])

export default router;