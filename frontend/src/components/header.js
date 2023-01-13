import { useEffect, useState } from "react"
import Link from 'next/link'
import { Button, Badge } from '@mantine/core';

import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, clearAll } from '../redux/user'
import { fetchUserFromJWT, saveJWT } from '../functions/user'
import { backendStatus, blockchainStatus } from '../functions/checkStatus'

export const fetch = async (dispatch, username, signedIn, userId) => {
    let data = await fetchUserFromJWT()
    if (data.username === undefined) {
        data.username = "";
    }
    data.signedIn = (data.username != "")
    dispatch(setUserInfo(data))
}


const Header = () => {
    const [fetched, setFetched] = useState(false)
    const [backendIsUp, setBackendIsUp] = useState(false)
    const [blockchainIsUp, setBlockchainIsUp] = useState(false)

    //Redux
    const { username, signedIn, company, role } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const signOut = () => {
        saveJWT("Bearer ")
        dispatch(clearAll())
    }

    useEffect(() => {
        const checkStatus = async () => {
            setBackendIsUp(await backendStatus())
            setBlockchainIsUp(await blockchainStatus())
        }

        if (!fetched) {
            checkStatus()
            fetch(dispatch, username, signedIn)
                .catch(console.error)
            setFetched(true)
        }
    })

    return (
        <>
            <title>UOW FYP</title>
            <header style={{ width: '100%' }}>


                <table style={{ width: '100%' }}>
                    <thead></thead>
                    <tbody>
                        <tr>
                            {/* Logo */}
                            <td className="headerItem">
                                <div>
                                    <Link href="/">
                                        <a>
                                            <img src="/images/logo.jpg" height="150" />
                                        </a>
                                    </Link>

                                </div>
                            </td>

                            {/* Server status */}
                            <td style={{ borderRadius: 20, textAlign: "center" }} className="headerItem">
                                <Button style={{ margin: 10 }} onClick={() => { window.open('https://fyp.johnnyip.com', '_blank'); }}>
                                    Project Introduction Website
                                </Button><br />
                                <div style={{ fontSize: 22, display: "inline-block", alignSelf: "flex-end", paddingLeft: 50, paddingRight: 50 }}>
                                    <div style={{ textAlign: "center" }} >
                                        <Badge color="gray" size="xl" radius="sm" variant="filled" >Server Status</Badge>
                                    </div>
                                    <br />
                                    <Badge color={backendIsUp ? "green" : "red"} style={{ backgroundColor: backendIsUp ? "#B6F3B8" : "#FCB2B2" }} size="xl" variant="dot">Backend Database</Badge><br />
                                    <Badge color={blockchainIsUp ? "green" : "red"} style={{ backgroundColor: blockchainIsUp ? "#B6F3B8" : "#FCB2B2" }} size="xl" variant="dot">Blockchain</Badge>
                                </div>

                            </td>

                            {/* Login status */}
                            <td className="headerItem">
                                {
                                    (signedIn) ?
                                        <div style={{ fontSize: 20, textAlign: 'right' }}>
                                            Hi, {username}<br />
                                            Role: {role}<br />
                                            Company: {company}<br />
                                            <Link href="#">
                                                <Button
                                                    onClick={() => signOut()}>Logout</Button>
                                            </Link>
                                        </div> : <></>
                                }

                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr />
            </header>

        </>

    )
}

export default Header;
