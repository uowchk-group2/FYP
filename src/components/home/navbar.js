import { useState } from 'react'
import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    ActionIcon,
    Modal
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import NavBarItem from "./navbarItem";
import NewOrder from '../order/newOrder'

const NavBar = (props) => {
    const [addNew,setAddNew] = useState(false)
    let data = props.data

    return (
        <Navbar width={{ base: 300 }} >
            <Navbar.Section style={{ padding: 20, textAlign: "center" }}>
                <Button
                    variant='filled'
                    onClick={() => { setAddNew(true) }}
                >
                    <ActionIcon variant='transparent'>
                        <Plus color="white" />
                    </ActionIcon>
                    Purchase Order
                </Button>
            </Navbar.Section>

            {[...data].map((item, i) => {
                return <NavBarItem data={item} />
            })}


            <Modal
                size="xl"
                opened={addNew}
                onClose={() => { setAddNew(false) }}
            >

                <NewOrder />
            </Modal>


        </Navbar>
    )
}

export default NavBar;