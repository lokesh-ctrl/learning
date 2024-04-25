//form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

type RHFTextFieldProps = {
  name: string;
  label: String;
  helperText: String;
};

export default function RHFTextField({
  name,
  helperText,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
