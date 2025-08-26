import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import { Flex, Spinner } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const PublicRoute = () => {
    const { user, loading } = useAuth();
    if (loading) {
      return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );
    }
    if (user) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicRoute />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <DashboardPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;