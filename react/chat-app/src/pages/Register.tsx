import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RegisterForm } from "../sections/RegisterForm.tsx";

const Register = () => {
  return (
    <>
      <h4>Get Started With Chat App!</h4>
      <p>Already have an account?</p>
      <Link component={RouterLink} to="/auth/login" variant="subtitle2">
        Sign in
      </Link>
      <RegisterForm />
      {/*<RegisterFormBasic/>*/}
    </>
  );
};

export default Register;
