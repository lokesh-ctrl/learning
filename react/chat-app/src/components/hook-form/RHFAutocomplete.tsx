//form
import { useFormContext,Controller } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";

type RHFAutocompleteProps = {
    name: string,
    label: String,
    helperText: any
}

export default function RHFAutocomplete({name, label, helperText, ...other}: RHFAutocompleteProps){

    const {control, setValue} = useFormContext();
    return (
       <Controller name={name} control={control} render={({field,fieldState:{error}})=>(
        <Autocomplete {...field} fullWidth
         value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
         onChange={(event, newValue) => setValue(name, newValue, {shouldValidate: true})}
         error={!!error} 
        {...other}
        renderInput={(params)=> (
            <TextField label={label} error={!!error} helperText={error ? error.message : helperText} {...params}/>
        )}/>
       )}/>
    )
}