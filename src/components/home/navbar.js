import { Link } from "react-router-dom";
import { useState } from "react"

import {
    Navbar,
    Button,
    ActionIcon,
    UnstyledButton,
    Group,
    Text,
    Table
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import Styles from "../../styles/navbar.css"


const NavBar = () => {
    const [hovered, setHovered] = useState(false)
    const buttonStyle = {
        // width: "100%",
        height: "100%",
        textAlign: "left",
        padding: 15,
    }

    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 20, textAlign: "center" }}>
                <Button variant='filled' >
                    <ActionIcon variant='transparent'>
                        <Plus color="white" />
                    </ActionIcon>
                    Purchase Note
                </Button>
            </Navbar.Section>

            <Navbar.Section >
                <Button fullWidth variant='subtle' style={{ height: '100%', textAlign: "left" }}>
                    <Text align="left">
                        Good: Gold <br />
                        Supplier: Johnny Co. <br />
                        Distributor: Oscar Co.<br />
                        Status: On the way<br />
                    </Text>
                </Button>
            </Navbar.Section>

            <Navbar.Section >
                <Button variant='subtle' style={buttonStyle} >
                        <Table style={{ fontSize: 16, width: 265, textAlign: "left", color:"#A0A0A0" }} >
                            <tr>
                                <th>Good:</th>
                                <td>Jewel</td>
                            </tr>
                            <tr>
                                <th>Created Date:</th>
                                <td>09-04-2022</td>
                            </tr>
                            <tr>
                                <th>Supplier:</th>
                                <td>Johnny Co. </td>
                            </tr>
                            <tr>
                                <th>Distributor:</th>
                                <td>Ivan Co.</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td>On the way</td>
                            </tr>
                            <tr>
                                <td colspan="2" >
                                    <hr/>
                                </td>
                            </tr>
                            {/* Supplier: Johnny Co. <br />
                        Supplier: Ivan Co. <br />
                        Status: On the way<br /> */}
                        </Table>
                </Button>
            </Navbar.Section>

        </Navbar>
    )
}

export default NavBar;