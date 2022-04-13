import {
    Button,
    Input,
    PasswordInput, InputWrapper
} from "@mantine/core";

const LoginSection = () => {
    return (
        <div>
            <h2>Sign In</h2>
            <InputWrapper label="Username">
                <Input placeholder="Username" />
            </InputWrapper> <br/>

            <InputWrapper label="Password">
                <PasswordInput required placeholder="Password" />
            </InputWrapper> <br/>

            <br />
            <Button uppercase>Sign In</Button>
        </div>
    )
};

export default LoginSection;