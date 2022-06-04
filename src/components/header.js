import { useEffect, useState } from "react"
import Link from 'next/link'
import { Group, Button, Badge } from '@mantine/core';

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setSignedIn } from '../redux/user'
import { fetchUserFromJWT, saveJWT } from '../functions/user'
import { backendStatus } from '../functions/checkStatus'

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
    const [backendIsUp, setBackendIsUp] = useState(false)
    const [blockchainIsUp, setBlockchainIsUp] = useState(false)

    //Redux
    const { username, signedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const signOut = () => {
        saveJWT("Bearer ")
        dispatch(setUsername(""))
        dispatch(setSignedIn(false))
    }

    useEffect(() => {
        const checkStatus = async () => {
            setBackendIsUp(await backendStatus())

        }

        if (!fetched) {
            checkStatus()
            fetch(dispatch, username, signedIn)
                .catch(console.error)
            setFetched(true)
        }
    })

    return (
        <header>
            <div style={{display: 'flex', padding:20}}>
                <Link href="/">
                    <a>
                        <img src="/images/logo.jpg" height="150" />
                    </a>
                </Link>

                <div style={{ fontSize: 22,display: "inline-block", alignSelf: "flex-end", paddingLeft:50,   }}>
                    Server Status:
                    <Badge color={backendIsUp ? "green" : "red"} size="xl" variant="dot">Backend Database</Badge>
                    <Badge color={blockchainIsUp ? "green" : "red"} size="xl" variant="dot">Blockchain ( Under development )</Badge>
                </div>
            </div>

            {
                (signedIn) ?
                    <div style={{ fontSize: 22, textAlign: 'right' }}>
                        Hi, {username}.<br />
                        <Link href="#">
                            <Button
                                onClick={() => signOut()}>Logout</Button>
                        </Link>
                    </div> : <></>
            }
            <hr />
        </header>
    )
}

export default Header;