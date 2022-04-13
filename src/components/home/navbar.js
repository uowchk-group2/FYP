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
import NavBarItem from "./navbarItem";


const NavBar = () => {

    const data = [
        { good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", status: "On the way" },
        { good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", status: "Delivered" }
    ]

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

            {[...data].map((item,i) =>{
                return <NavBarItem data={item}/>
            })}



        </Navbar>
    )
}

export default NavBar;