import { useEffect, useState } from "react"
import Link from 'next/link'
import { Group, Button } from '@mantine/core';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setSignedIn } from '../redux/user'
import { fetchUserFromJWT, saveJWT } from '../functions/user'

export const fetch = async (dispatch, username, signedIn) => {
    let data = await fetchUserFromJWT()
    console.log(data.username)
    if (data.username === undefined) {
        data.username = "";
    }

    dispatch(setUsername(data.username))
    dispatch(setSignedIn(data.username != ""))

    console.log(window.location.pathname)

    let path = window.location.pathname
    console.log("signedIn: " + signedIn)
}


const Header = () => {
    const [fetched, setFetched] = useState(false)

    //Redux
    const { username,signedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const signOut = () => {
        saveJWT("Bearer ")
        dispatch(setUsername(""))
        dispatch(setSignedIn(false))
    }

    useEffect(() => {
        if (!fetched) {
            fetch(dispatch,username, signedIn)
                .catch(console.error)
            setFetched(true)
        }
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
                        Hi, {username}.<br />
                        <Link href="#">
                            <Button
                                onClick={() => signOut()}>Logout</Button>
                        </Link>
                    </div> :

                    <div style={{ fontSize: 22, textAlign: 'right' }}>
                        You are not signed in.<br />
                    </div>

            }



            {/* <Group>
                Demo:
                <Link href="/">
                    <Button>Not sign in (Login page)</Button>
                </Link>
                <Link href="/home">
                    <Button>Signed in (Homepage)</Button>
                </Link>

            </Group> */}
            <hr />
        </header>
    )
}

export default Header;