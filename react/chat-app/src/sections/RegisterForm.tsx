import {useForm, SubmitHandler} from "react-hook-form"
import {Button, FormLabel, Input} from "@mui/material";

type Inputs = {
    name: string
    email: string
    password: string
}

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <FormLabel>Enter name:</FormLabel>
                <Input defaultValue="name" {...register("name")} />
            </div>

            <div>
                {/* include validation with required or other standard HTML validation rules */}
                <FormLabel>Enter Email:</FormLabel>
                <Input {...register("email", {required: true})} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div>
                <FormLabel>Enter Password:</FormLabel>
                <Input {...register("password", {required: true})} />
                {errors.password && <span>This field is required</span>}
            </div>
            <div>
                <Button type="submit" variant="contained">Submit</Button>
            </div>
        </form>
    )
}