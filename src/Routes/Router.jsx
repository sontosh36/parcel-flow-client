import { createBrowserRouter } from "react-router";
import RootLayout from "./../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from './PrivateRoute';
import Riders from "../Pages/Rider/Riders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'rider',
        element: <PrivateRoute><Riders></Riders></PrivateRoute>
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/services-centers.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login,
        },
        {
            path: 'register',
            Component: Register,
        }
    ]
  }
]);
