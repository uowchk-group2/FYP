import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    ActionIcon,
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';
import NavBarItem from "./navbarItem";


const NavBar = () => {

    const data = [
        { good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", status: "On the way",delivered: 10, total:100, unit:"kg"},
        { good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", status: "Delivered",delivered: 20, total:20,unit:"kg" }
    ]

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