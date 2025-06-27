import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
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
import PlantDetails from "../Components/HomeComponents/PlantDetails";
import UpdatePlant from "../Components/Pages/UpdatePlant";
import Dashboard from "../Components/Pages/Dashboard";

const router = createBrowserRouter([
    // Public and main app routes (with Navbar/Footer)
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                loader: () => fetch('https://plant-care-tracker-omega.vercel.app/plants'),
                hydrateFallbackElement: <div className="text-center mt-10"><span className="loading loading-bars loading-xl"></span></div>,
                element: <Home />
            },
            {
                path: '/all-plants',
                loader: () => fetch('https://plant-care-tracker-omega.vercel.app/plants'),
                element: <AllPlants />
            },
            {
                path: '/add-plants',
                element: <PrivetRouts><AddPlant /></PrivetRouts>
            },
            {
                path: '/plant-details/:plantId',
                loader: () => fetch('https://plant-care-tracker-omega.vercel.app/plants'),
                element: <PrivetRouts><PlantDetails /></PrivetRouts>
            },
            {
                path: '/update-plant/:plantId',
                loader: ({ params }) => fetch(`https://plant-care-tracker-omega.vercel.app/plants/${params.plantId}`),
                element: <PrivetRouts><UpdatePlant /></PrivetRouts>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },

    // Dashboard route 
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <PrivetRouts><Dashboard /></PrivetRouts>
            },
            {
                path: 'my-plants',
                loader: () => fetch('https://plant-care-tracker-omega.vercel.app/plants'),
                element: <PrivetRouts><MyPlants /></PrivetRouts>
            },
            {
                path: 'my-profile',
                element: <PrivetRouts><MyProfile /></PrivetRouts>
            }


        ]
    }
]);

export default router;
