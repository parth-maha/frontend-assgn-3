import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Dashboard from "../components/Dashboard";
import Product from "../components/pages/Product";
import Home from "../components/Home";
import About from "../components/About";
import ProductCard from "../components/ui/ProductCard";
import Cart from "../components/ui/cart";
import ErrorPage from "../components/ErrorPage";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "shop",
        element: <Dashboard />,
        children: [
          { path: 'products', element: <Product /> },
          { path: 'products/:productId', element: <ProductCard /> },
          { path: 'products/:/customize', element: <NotFound /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;