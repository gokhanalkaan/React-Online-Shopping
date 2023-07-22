import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import SingleProduct from "./pages/SingleProduct";
import ShoppingCart from "./pages/ShoppingCart";
import Favorites from "./pages/Favorites";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";

//const user=true;

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const user = useSelector((state) => state.auth.currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },

        {
          path: "/products/:category",
          element: <ProductList />,
        },

        {
          path: "/product/:id",
          element: <SingleProduct />,
        },

        {
          path: "/cart",
          element: user ? <ShoppingCart /> : <Navigate to="/login" replace />,
        },

        {
          path: "/favorites",
          element: <Favorites />,
        },

        {
          path: "/success",
          element: user ? <Success /> : <Navigate to="/login" replace />,
        },

        {
          path: "/orders",
          element: user ? <Orders /> : <Navigate to="/login" replace />,
        },
      ],
    },

    {
      path: "/login",
      element: user === null ? <Login /> : <Navigate to="/" replace />,
    },
    {
      path: "/register",
      element: user === null ? <Register /> : <Navigate to="/" replace />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
