import { useState } from 'react';

import {
    Button,
    Input,
    PasswordInput,
    InputWrapper,
    Select

} from "@mantine/core";

const SignupSection = () => {
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


    return (
        <div>
            <h2>Sign Up</h2>
            <InputWrapper
                required
                error={invUsername ? "Username already exist." : ""}
                label="Username">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    invalid={invUsername}
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
                    disabled={!submittable}
                    uppercase>
                    Sign Up
                </Button>
            </div>

        </div>
    )
};

export default SignupSection;