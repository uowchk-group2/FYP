import { useState } from 'react';

import {
    Button,
    Input,
    PasswordInput,
    InputWrapper,
    Select

} from "@mantine/core";

const SignupSection = () => {
    const [role, setRole] = useState('');



    return (
        <div>
            <h2>Sign Up</h2>
            <InputWrapper
                required
                error="Username already exist."
                label="Username">
                <Input placeholder="Username" />
            </InputWrapper> <br />

            <InputWrapper
                required
                error="Password must not be empty"
                label="Password">
                <PasswordInput required placeholder="Password" />
            </InputWrapper> <br />

            <InputWrapper
                required
                error="Two passwords do not match"
                label="Re-enter password">
                <PasswordInput required placeholder="Re-enter password" />
            </InputWrapper> <br />

            <Select
                label="Choose your role"
                placeholder="Select User Role"
                onChange={setRole}
                required
                data={['Supplier', 'Distributor', 'Driver']}
            /><br />

            <InputWrapper
                description="For display purpose"
                required
                label="Your Name">
                <Input placeholder="Company Name" />
            </InputWrapper> <br />

            <InputWrapper
                description="For display purpose"
                required
                label="Company Name">
                <Input placeholder="Company Name" />
            </InputWrapper> <br />


            <Button uppercase>Sign Up</Button>

        </div>
    )
};

export default SignupSection;