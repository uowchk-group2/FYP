import { useState, useEffect } from 'react';
import { Button, Input, PasswordInput, InputWrapper, Select } from "@mantine/core";
import { useDispatch } from "react-redux";


import { usernameStatus } from '../../functions/checkStatus'
import { signUp } from '../../functions/user'
import { login, saveJWT, checkJWT } from "../../functions/user"
import { fetch } from '../../components/header'


const SignupSection = () => {
    //State of form
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [role, setRole] = useState('');
    const [name, setName] = useState("")
    const [companyName, setCompanyName] = useState("")

    //For showing errors
    const [invUsername, setInvUsername] = useState(false)
    const [invPassword, setInvPassword] = useState(false)
    const [invPasswordConfirm, setInvPasswordConfirm] = useState(false)
    const [invRole, setInvRole] = useState(false)
    const [invName, setInvName] = useState(false)
    const [invCompanyName, setInvCompanyName] = useState(false)

    const [submittable, setSubmittable] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)

    //Redux
    const dispatch = useDispatch();

    const submit = async () => {
        setLoading(true)
        await checkSubmittable()
        if (!submittable) {
            // alert("There are some errors in the form.")
            if (username === "") { setInvUsername(true) }
            if (password === "") { setInvPassword(true) }
            if (passwordConfirm === "") { setInvPasswordConfirm(true) }
            if (role === "") { setInvRole(true) }
            if (name === "") { setInvName(true) }
            if (companyName === "") { setInvCompanyName(true) }
        } else {
            // alert("Submitted.")
            setSubmitted(true)
            await signUp(username, password, role, name, companyName)
            let returnedMessage = await login(username, password);

            if (returnedMessage != "Wrong Username or password" && returnedMessage != "Server Error: Failed to connect server") {
                saveJWT(returnedMessage)
                fetch(dispatch)
            }

        }
        setLoading(false)
    }


    const checkSubmittable = async () => {
        if (!invUsername && !invPassword && !invPasswordConfirm && !invRole && !invName && !invCompanyName &&
            username != "" && password != "" && passwordConfirm != "" && role != "" && name != "" && companyName != "") {
            setSubmittable(true)
        } else {
            setSubmittable(false)
        }

    }

    useEffect(() => {
        const checkUsername = async () => {
            let result = await usernameStatus(username).catch(console.error);
            setInvUsername(result)
        }

        if (!submitted) {
            //Check username
            if (username != "") {
                // setInvUsername(false)
                setUsername(username.replace(/\W/g,'').toLowerCase())
                checkUsername().catch(console.error)
            }

            //Check password
            if (password != "") { setInvPassword(false) }

            //Check passwordConfirm
            if (passwordConfirm != "" && password != passwordConfirm) {
                setInvPasswordConfirm(true)
            } else if (passwordConfirm != "" && password === passwordConfirm) {
                setInvPasswordConfirm(false)
            }

            //Check role
            if (role != "") { setInvRole(false) }

            //Check Name
            if (name != "") { setInvName(false) }

            //Check CompanyName
            if (companyName != "") { setInvCompanyName(false) }

            checkSubmittable()
        }
    })

    return (
        <div>
            <h2>Sign Up</h2>
            <InputWrapper
                required
                error={invUsername ? username === "" ? "Password must not be empty" : `Username ${username} already exist.` : ""}
                label="Username">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    invalid={(invUsername)}
                />
            </InputWrapper> <br />

            <InputWrapper
                required
                label="Password">
                <PasswordInput
                    required
                    placeholder="Password"
                    error={invPassword ? "Password must not be empty" : ""}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </InputWrapper> <br />

            <InputWrapper
                required
                label="Re-enter password">
                <PasswordInput
                    required
                    error={invPasswordConfirm ? "Two passwords do not match." : ""}
                    placeholder="Re-enter password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    invalid={invPasswordConfirm}

                />
            </InputWrapper> <br />

            <Select
                label="Choose your role"
                placeholder="Select User Role"
                error={invRole ? "You must select one role." : ""}
                onChange={setRole}
                required
                data={['Supplier', 'Distributor', 'Driver']}
                invalid={invRole}
            /><br />

            <InputWrapper
                description="For display purpose"
                required
                error={invName ? "This field must not be empty." : ""}
                label="Your Name"
            >
                <Input
                    placeholder="Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    invalid={invName}
                />
            </InputWrapper> <br />

            <InputWrapper
                description="For display purpose"
                required
                label="Company Name"
                error={invCompanyName ? "This field must not be empty." : ""}
            >
                <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    invalid={invCompanyName}
                    placeholder="Company Name"
                />
            </InputWrapper> <br />


            <div style={{ textAlign: 'center' }}>
                <Button
                    // disabled={!submittable}
                    onClick={() => submit()}
                    loading={loading}
                    uppercase>
                    Sign Up
                </Button>
            </div>

        </div>
    )
};

export default SignupSection;