import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./AuthProvider.jsx";
import Register from "./pages/Register.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Shop from "./pages/Shop.jsx";
import CategoryDetails from "./CategoryDetails.jsx";
import Cart from "./pages/Cart.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import HomePage from "./pages/admin/HomePage.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import CategoryManagement from "./pages/admin/CategoryManagement.jsx";
import PaymentManagement from "./pages/admin/PaymentManagement.jsx";
import SalesReport from "./pages/admin/SalesReport.jsx";
import BannerManagement from "./pages/admin/BannerManagement.jsx";
import SellerLayout from "./pages/SellerLayout.jsx";
import SellerHomePage from "./pages/seller/SellerHomePage.jsx";
import ManageMedicines from "./pages/seller/ManageMedicine.jsx";
import PaymentHistory from "./pages/seller/PaymentHistory.jsx";
import AskForAdvertisement from "./pages/seller/AskForAddvertisement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/category/:category",
        loader: ({ params }) => params.category,
        element: <CategoryDetails />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "categories",
        element: <CategoryManagement />,
      },
      {
        path: "payments",
        element: <PaymentManagement />,
      },
      {
        path: "sales",
        element: <SalesReport />,
      },
      {
        path: "banners",
        element: <BannerManagement />,
      },
    ],
  },
  {
    path: "/seller",
    element: (
      <PrivateRoute>
        <SellerLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SellerHomePage />,
      },
      {
        path: "medicines",
        element: <ManageMedicines />,
      },
      {
        path: "payments",
        element: <PaymentHistory />,
      },
      {
        path: "advertisements",
        element: <AskForAdvertisement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
