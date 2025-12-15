import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      {
        path: 'home',
        element: <Home />
      },

      {
        path: 'cart',
        element: <Cart />
      },

      {
        path: 'profile',
        element: <Profile />
      },

      {
        path: 'login',
        element: <Login />

      },

      {
        path: 'register',
        element: <Register />
      }


    ],
  },

  
]);

export default router;