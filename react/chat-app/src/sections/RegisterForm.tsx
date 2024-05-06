import { FormProvider, useForm } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Eye, EyeSlash } from "phosphor-react";
import { registerUser } from "../services/auth.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(3, "First name must be minimum 3 chars long"),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(1, "Last name must be min 2 chars long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const response = await registerUser(data);
    if (response.error) {
    } else {
      navigate("/");
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )} */}
        <Stack spacing={3}>
          <TextField
            label="First Name"
            variant="filled"
            {...register("first_name")}
            error={errors.first_name != null}
            helperText={errors.first_name?.message}
          />
          <TextField
            label="Last Name"
            variant="filled"
            {...register("last_name")}
            error={errors.last_name != null}
            helperText={errors.last_name?.message}
          />
          <TextField
            label="Email address"
            variant="filled"
            {...register("email")}
            error={errors.email != null}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password")}
            error={errors.password != null}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained">
            Create Account
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
