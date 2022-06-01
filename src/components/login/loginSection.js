
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../../redux/counter";
import { login, saveJWT, checkJWT } from "../../functions/user"

import { Button, Input, PasswordInput, InputWrapper, Badge } from "@mantine/core";



const LoginSection = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault;
        signInHandler()
    }

    const signInHandler = async () => {
        console.log(username)
        console.log(password)

        //Lodaing
        setLoading(true)
        setError(false)
        let returnedMessage = await login(username, password);
        setMessage(returnedMessage)

        //Result
        if (returnedMessage === "Wrong Username or password" || returnedMessage === "Server Error: Failed to connect server") {
            setError(true)
            setMessage(returnedMessage)
            setLoading(false)
        } else {
            console.log("OK")
            saveJWT(returnedMessage)
            window.location.href = "/home"
        }
    }


    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <h2>Sign In</h2>
                <InputWrapper label="Username">
                    <Input placeholder="Username" onChange={(value) => { setUsername(value.target.value) }} />
                </InputWrapper> <br />

                <InputWrapper label="Password">
                    <PasswordInput required placeholder="Password" onChange={(value) => { setPassword(value.target.value) }} />
                </InputWrapper> <br />

                <br />
                <Button type="submit" uppercase onClick={() => { signInHandler() }} loading={loading} >Sign In</Button>
                <br /><br />
                {error ?
                    <Badge color="pink" variant="outline" size="lg">{message}</Badge>
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