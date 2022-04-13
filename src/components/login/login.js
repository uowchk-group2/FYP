import { SimpleGrid } from "@mantine/core";

import LoginSection from './loginSection'
import SignupSection from './signUpSection'

const Login = () => {
    return (
        <div>
            <SimpleGrid cols={2} spacing={100}>
                {/* Sign In */}
                <LoginSection />

                {/* Sign Up */}
                <SignupSection />

            </SimpleGrid>
        </div>
    )
}

export default Login;