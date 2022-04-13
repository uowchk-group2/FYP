import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    ActionIcon,
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';
import NavBarItem from "./navbarItem";


const NavBar = (props) => {
    let data = props.data

    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 20, textAlign: "center" }}>
                <Link to="/newOrder">
                    <Button variant='filled' >
                        <ActionIcon variant='transparent'>
                            <Plus color="white" />
                        </ActionIcon>
                        Purchase Order
                    </Button>
                </Link>
            </Navbar.Section>

            {[...data].map((item, i) => {
                return <NavBarItem data={item} />
            })}

        </Navbar>
    )
}

export default NavBar;