import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import HomePgaeLyaout from "../layouts/HomePgaeLyaout";
import AboutPage from "../pages/AboutPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Chat from "../pages/Chat";

import ProtectedRoute from "../context/ProtectedRoute";
import PublicRoute from "../context/PublicRoute";

const router = createBrowserRouter([
  // Public Landing Pages
  {
    path: "/",
    element: <HomePgaeLyaout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },

  // Auth Pages (Block access if logged in)
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  // Chat (Only logged in users)
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);

export default router;
