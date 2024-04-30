import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../sections/LoginForm";

const Login = () => {
  return (
    <div>
      <Typography variant="h4">Login to WeChat</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New User?</Typography>
        <Link to="/auth/register" component={RouterLink} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
      <LoginForm />
    </div>
  );
};

export default Login;
