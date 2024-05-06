import { Suspense, lazy } from "react"; // use to loading , loading screen until full page is load
import { useRoutes, Navigate } from "react-router-dom";
import LoadingScreen from "../components/Loading";
import MainLayout from "../layouts/main";
import Cookies from "js-cookie";
import { HomePage } from "../pages/HomePage";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <RegisterPage />, path: "register" },
        { element: <ResetPasswordPage />, path: "reset-password" },
        { element: <NewPasswordPage />, path: "new-password" },
      ],
    },
    {
      path: "/",
      element: <HomePage />,
    },
    { path: "*", element: <MainLayout /> },
  ]);
}

const ProtectedRoute = (Component: any) => () => {
  const accessToken = Cookies.get("access_token");
  return accessToken ? <Navigate to="/home" /> : <Component />;
};

const LoginPage = Loadable(
  ProtectedRoute(lazy(() => import("../pages/Login")))
);

const RegisterPage = ProtectedRoute(
  Loadable(lazy(() => import("../pages/Register")))
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/ResetPassword"))
);

const NewPasswordPage = Loadable(lazy(() => import("../pages/NewPassword")));
