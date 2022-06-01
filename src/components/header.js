import { useEffect, useState } from "react"
import Link from 'next/link'
import { Group, Button } from '@mantine/core';
import { checkJWT } from "../functions/user"

const Header = () => {

    const checkLoginStatus = () => {
        console.log("Header check")
        let jwt = checkJWT()
        if (jwt == "") {
            console.log("Empty")
        } else {
            console.log(jwt)
        }
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

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Hi, user.<br />
                <Link href="#">
                    <Button>Logout</Button>
                </Link>
            </div>

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Not signed in.<br />
                <Link href="/">
                    <Button>Login</Button>
                </Link>
            </div>

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