import {Suspense, lazy} from "react"; // use to loading , loading screen until full page is load
import {useRoutes} from "react-router-dom";
import LoadingScreen from "../components/Loading";
import MainLayout from "../layouts/main";
import("../pages/Login");

const Loadable = (Component: any) => (props: any) => {
    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: "/auth",
            element: <MainLayout/>,
            children: [
                {element: <LoginPage/>, path: "login"},
                {element: <RegisterPage/>, path: "register"},
                {element: <ResetPasswordPage/>, path: "reset-password"},
                {element: <NewPasswordPage/>, path: "new-password"},
            ],
        },
        {path: "*", element: <MainLayout/>},
    ]);
}

const LoginPage = Loadable(lazy(() => import("../pages/Login")));

const RegisterPage = Loadable(lazy(() => import("../pages/Register")));

const ResetPasswordPage = Loadable(
    lazy(() => import("../pages/ResetPassword"))
);

const NewPasswordPage = Loadable(lazy(() => import("../pages/NewPassword")));
