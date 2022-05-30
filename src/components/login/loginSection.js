import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../../redux/counter";

import {
    Button,
    Input,
    PasswordInput, InputWrapper
} from "@mantine/core";


const LoginSection = () => {
    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Sign In</h2>
            <InputWrapper label="Username">
                <Input placeholder="Username" />
            </InputWrapper> <br />

            <InputWrapper label="Password">
                <PasswordInput required placeholder="Password" />
            </InputWrapper> <br />

            <br />
            <Button uppercase>Sign In</Button>

            <h1>Hi, {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(33))}>33</button>
        </div>
    )
};

export default LoginSection;