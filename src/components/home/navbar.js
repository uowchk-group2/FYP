import { Link } from "react-router-dom";
import {useState} from "react"

import {
    Navbar,
    Button,
    ActionIcon,
    UnstyledButton,
    Group,
    Text
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import "../../styles/navbar.css"


const NavBar = () => {
    const [hovered,setHovered] = useState(false)
    const buttonStyle = {
        width: "100%",
        height:"100%",
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
                <Button variant='subtle' style={buttonStyle}>
                    <table>
                        <tr>
                            <th>Good</th>
                            <td>Jewel</td>
                        </tr>
                        {/* Supplier: Johnny Co. <br />
                        Supplier: Ivan Co. <br />
                        Status: On the way<br /> */}
                    </table>
                </Button>
            </Navbar.Section>

        </Navbar>
    )
}

export default NavBar;