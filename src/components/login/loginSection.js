
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { login, saveJWT } from "../../functions/user"
import { fetch } from '../../components/header'

import { Group, Button, Input, PasswordInput, InputWrapper, Badge } from "@mantine/core";



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

    const loadDemoAccount = (role) => {
        setUsernameInput(role)
        setPasswordInput(role)
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
            saveJWT(returnedMessage)
            fetch(dispatch)
            window.location.href = "/"
        }
    }

    return (
        <div className="signin">
            <form onSubmit={onFormSubmit} style={{ textAlign: 'left' }}>
                <Group grow>
                    <Badge color="dark" size="xl" radius="sm">Login</Badge>
                </Group>
                <InputWrapper label="Username">
                    <Input
                        placeholder="Username"
                        onChange={(value) => { setUsernameInput(value.target.value) }}
                        value={usernameInput}
                    />
                </InputWrapper> <br />

                <InputWrapper label="Password">
                    <PasswordInput
                        required
                        placeholder="Password"
                        onChange={(value) => { setPasswordInput(value.target.value) }}
                        value={passwordInput}
                    />
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

                {/* Sample Login account */}

                <h2 className="center">Load Demo Accounts</h2>

                <Group position="center">
                    <Button
                        onClick={() => loadDemoAccount("supplier")}
                    >
                        Supplier
                    </Button>

                    <Button
                        onClick={() => loadDemoAccount("distributor")}
                    >
                        Distributor
                    </Button>

                    <Button
                        onClick={() => loadDemoAccount("driver")}
                    >
                        Driver
                    </Button>


                </Group>

            </form>
            <hr style={{ marginBottom: 30 }} />

        </div>
    )
};

export default LoginSection;