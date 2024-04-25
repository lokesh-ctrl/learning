import React, {useState} from "react";
import {Button} from "@mui/material";

export const RegisterFormBasic = () => {
    const [name, setName] = useState("");
    const [emailError, setEmailErrror] = useState(false);
    const [email, setEmail] = useState("")
    const emailRegex = new RegExp(/[\w-.]+@([\w-]+\.)+[\w-]{2,4}/);
    return (
        <form>
            <div>
                <label>Enter name</label>
                <input type="text"/>
            </div>
            <div>
                <label>Enter email</label>
                <input type="text" onChange={(e) => {
                    if (!emailRegex.test(e.target.value)) {
                        console.log("coming inside")
                        setEmailErrror(true)
                    } else {
                        setEmailErrror(false)
                    }
                    setEmail(e.target.value);
                }} value={email}/>
                <div>{emailError ? "Wrong email" : ""}</div>
            </div>
            <div>
                <label>Enter password</label>
                <input type="text"/>
            </div>
            <Button type="submit" variant="contained">Signup</Button>
        </form>
    )
}