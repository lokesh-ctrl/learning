import {Suspense, lazy, FunctionComponent} from "react"; // use to loading , loading screen until full page is load
import { useRoutes, Navigate } from "react-router-dom";
import LoadingScreen from "../components/Loading";
import MainLayout from "../layouts/main";
import Cookies from "js-cookie";

const Loadable = (Component: FunctionComponent) => () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component/>
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <RegisterPage />, path: "register" },
        { element: <ResetPasswordPage />, path: "reset-password" },
        { element: <NewPasswordPage />, path: "new-password" },
      ],
    },
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {element: <MessagesPage/>, path: "chat"},
        {element: <MessagesPage/>, path: "calls"},
        {element: <MessagesPage/>, path: "contacts"},
        {element: <MessagesPage/>, path: "settings"}
      ]
    }
  ]);
}

const ProtectedRoute = (Component: any) => () => {
  const accessToken = Cookies.get("access_token");
  return accessToken ? <Navigate to="/"/> : <Component/>;
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

const MessagesPage = Loadable(lazy(() => import("../pages/Messages")))

const NewPasswordPage = Loadable(lazy(() => import("../pages/NewPassword")));
