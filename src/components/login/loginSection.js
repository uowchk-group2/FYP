
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { login, saveJWT } from "../../functions/user"
import { fetch } from '../../components/header'

import { Button, Input, PasswordInput, InputWrapper, Badge } from "@mantine/core";



const LoginSection = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("")

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    //Redux
    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault;
        signInHandler()
    }

    const signInHandler = async () => {

        //Lodaing
        setLoading(true)
        setError(false)
        let returnedMessage = await login(usernameInput, passwordInput);
        setMessage(returnedMessage)

        //Result
        if (returnedMessage === "Wrong Username or password" || returnedMessage === "Server Error: Failed to connect server") {
            setError(true)
            setMessage(returnedMessage)
            setLoading(false)
        } else {
            console.log("OK")
            saveJWT(returnedMessage)
            fetch(dispatch)
        }
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <h2>Sign In</h2>
                <InputWrapper label="Username">
                    <Input placeholder="Username" onChange={(value) => { setUsernameInput(value.target.value) }} />
                </InputWrapper> <br />

                <InputWrapper label="Password">
                    <PasswordInput required placeholder="Password" onChange={(value) => { setPasswordInput(value.target.value) }} />
                </InputWrapper> <br />

                <br />
                <div style={{ textAlign: 'center' }}>
                    <Button type="submit" uppercase onClick={() => { signInHandler() }} loading={loading} >Sign In</Button>
                </div>
                <br /><br />
                {error ?
                    <div style={{ textAlign: 'center' }}>
                        <Badge color="pink" variant="outline" size="lg">{message}</Badge>
                    </div>
                    : <></>
                }

                {/* <h1>Hi, {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(33))}>33</button> */}
            </form>
        </div>
    )
};

export default LoginSection;