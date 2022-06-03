import { useEffect, useState } from "react"
import Link from 'next/link'
import { Group, Button } from '@mantine/core';
import { isLogined } from "../functions/user"

const Header = () => {
    const [signedIn, isSingedIn] = useState(false)

    const checkLoginStatus = () => {
        console.log("Header check")
        isLogined()
        // let jwt = checkJWT()
        // if (jwt == "") {
        //     console.log("Empty")
        // } else {
        //     console.log(jwt)
        // }
    }

    useEffect(() => {
        checkLoginStatus();
    })

    return (
        <header>
            <Link href="/">
                <a>
                    <img src="/images/logo.jpg" height="150" />
                </a>
            </Link>

            {
                (signedIn) ?
                    <div style={{ fontSize: 22, textAlign: 'right' }}>
                        Hi, user.<br />
                        <Link href="#">
                            <Button>Logout</Button>
                        </Link>
                    </div> :

                    <div style={{ fontSize: 22, textAlign: 'right' }}>
                        You are not signed in.<br />
                    </div>

            }



            <Group>
                Demo:
                <Link href="/">
                    <Button>Not sign in (Login page)</Button>
                </Link>
                <Link href="/home">
                    <Button>Signed in (Homepage)</Button>
                </Link>

            </Group>
            <hr />
        </header>
    )
}

export default Header;