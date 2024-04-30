import { Button, Stack, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const navigate = useNavigate();
  const { register, handleSubmit } = methods;

  const onSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.error) {
    } else {
      navigate("/");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField {...register("email")} label="Email" />
          <TextField {...register("password")} label="Password" />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
