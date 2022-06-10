import { useEffect, useState } from "react"
import { SimpleGrid } from "@mantine/core";
import { backendStatus } from '../../functions/checkStatus'


import LoginSection from './loginSection'
import SignupSection from './signUpSection'

const Login = () => {
    const [backendIsUp, setBackendIsUp] = useState(false)

    useEffect(() => {
        const checkStatus = async () => {
            setBackendIsUp(await backendStatus())
        }

        checkStatus()
    })

    return (
        <div>
            {
                (backendIsUp) ?
                    <SimpleGrid cols={2} spacing={100}>
                        <LoginSection />
                        <SignupSection />
                    </SimpleGrid> :
                    <div style={{ textAlign: 'center' }}>
                        <br/><br/><br/><br/><br/><br/>
                        <h1>Sorry, backend server is not available at this moment.</h1>
                        <h1>Please try again later.</h1>
                    </div>

            }        </div>
    )
}

export default Login; 