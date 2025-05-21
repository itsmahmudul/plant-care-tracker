import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Error from "../Components/Pages/Error";
import Home from "../Components/Pages/Home";
import AllPlants from "../Components/Pages/AllPlants";
import AddPlant from "../Components/Pages/AddPlant";
import MyPlants from "../Components/Pages/MyPlants";
import About from "../Components/Pages/About";
import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import MyProfile from "../Components/Pages/MyProfile";
import PrivetRouts from "./PrivetRouts";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/all-plants',
                element: <AllPlants></AllPlants>
            },
            {
                path: '/add-plants',
                element: <PrivetRouts>
                    <AddPlant></AddPlant>
                </PrivetRouts>
            },
            {
                path: '/my-plants',
                element: <PrivetRouts>
                    <MyPlants></MyPlants>
                </PrivetRouts>
            },
            {
                path: '/my-profile',
                element: <PrivetRouts>
                    <MyProfile></MyProfile>
                </PrivetRouts>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default router;